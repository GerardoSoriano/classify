"use strict";
const puppeteer = require("puppeteer");
const Review = require("./Review");

const BASE_URL = "https://www.ratemyprofessors.com/";
const POPUP_CLOSE_BUTTON =
  ".Buttons__Button-sc-19xdot-1.CCPAModal__StyledCloseButton-sc-10x9kq-2.eAIiLw";

async function launchBrowser() {
  return puppeteer.launch({
    headless: "false",
    args: ["--disable-popup-blocking"],
  });
}

async function closePopup(page) {
  try {
    await page.waitForSelector(POPUP_CLOSE_BUTTON, { timeout: 5000 });
    await page.click(POPUP_CLOSE_BUTTON);
  } catch (err) {
    console.log("Failed to close the popup:", err);
  }
}

async function getProfessorURLFromRMP(professorName) {
    if(professorName.length === 0) {throw new Error("Professor name cannot be empty")}
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(`${BASE_URL}school/352`, { timeout: 60000 });

  const inputElement = await page.$(
    ".Search__DebouncedSearchInput-sc-10lefvq-1"
  );
  await inputElement.type(professorName);

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.keyboard.press("Enter"),
  ]);

  await closePopup(page);

  const professorId = await page.$(
    "a.TeacherCard__StyledTeacherCard-syjs0d-0.dLJIlx"
  );
  if (!professorId) {
    await page.screenshot({ path: "unable.png" });
    console.error("Unable to find professor element on the page.");
    await browser.close();
    throw new Error("Failed to find professor element.");
  }

  const idUrl = await professorId.evaluate((a) => a.href);

  await browser.close();
  return idUrl;
}

async function getProfessorOverallRating(professorName) {
  const url = await getProfessorURLFromRMP(professorName);
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(url, { timeout: 50000 });

  await closePopup(page);

  const value = await page.$eval(
    ".RatingValue__Numerator-qw8sqy-2.liyUjw",
    (div) => div.textContent
  );

  await browser.close();
  return value;
}

async function getReviewForProfessor(professorName) {
  const url = await getProfessorURLFromRMP(professorName);
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(url, { timeout: 50000 });

  await closePopup(page);

  const ratingList = await page.waitForSelector("#ratingsList");
  const listItems = await ratingList.$$eval("li", (lis) =>
    lis
      .map((li) => {
        // this contains the actual comment of the review
        const divReview = li.querySelector(
          ".Comments__StyledComments-dzzyvm-0.gRjWel"
        );
        const numQuality = li.querySelector(
          ".CardNumRating__CardNumRatingNumber-sc-17t4b9u-2"
        );
        const numDifficulty = li.querySelector(
          ".CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.cDKJcc"
        );
        const classLabel = li.querySelector(
          ".RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS"
        );
        const labels = Array.from(
          li.querySelectorAll(
            ".RatingTags__StyledTags-sc-1boeqx2-0.eLpnFv > .Tag-bs9vf4-0.hHOVKF"
          )
        ).map((span) => span.textContent);
        const [label1, label2, label3] = labels;

        // console.log(numDifficulty.textContent);
        //   console.log(qualityGrading.text);
        //   return divReview ? divReview.textContent : null;
        return {
          reviewText: divReview ? divReview.textContent : null,
          numQuality: numQuality ? parseFloat(numQuality.textContent) : null,
          numDifficulty: numDifficulty
            ? parseFloat(numDifficulty.textContent)
            : null,
          classLabel: classLabel ? classLabel.textContent : null,
          label1: label1,
          label2: label2,
          label3: label3,
        };
      })
      .filter(
        (item) =>
          item.reviewText &&
          item.numQuality &&
          item.numDifficulty &&
          item.classLabel &&
          item.label1 &&
          item.label2 &&
          item.label3
      )
  );

  const reviews = listItems.map(
    (item) =>
      new Review(
        item.reviewText,
        item.numQuality,
        item.numDifficulty,
        item.classLabel,
        item.label1,
        item.label2,
        item.label3
      )
  );

  await browser.close();
  return reviews;
}

getProfessorURLFromRMP("").then((link) => {
  console.log("link is:", link);
});

// getProfessorOverallRating("Dana Richards")
//   .then((rating) => {
//     console.log("Rating is: " + rating);
//   })
//   .catch((error) => {
//     console.error("Error fetching reviews:", error.stack);
//     // error.page.screenshot({path: 'error_screenshot.png'});
//   });

// getReviewForProfessor("Tamara Maddox")
//   .then((reviews) => {
//     console.log("length: " + reviews.length);
//     reviews.forEach(function (review) {
//       console.log(reviews);
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching reviews:", error.stack);
//     // error.page.screenshot({path: 'error_screenshot.png'});
//   });

module.exports = {
  getProfessorURLFromRMP,
  getProfessorOverallRating,
  getReviewForProfessor,
};
