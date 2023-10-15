"use strict";
const Review = require("./Review");

const puppeteer = require("puppeteer");

/**
 * This function takes a professor's name as input and submits a search form. It then navigates to the search results
 * and retrieves the first entry matching the specified professor. Finally, it returns the associated URL.
 * @param {*} professorName name of the professor.
 * @returns the url that contains the professor profile.
 */
async function getProfessorURLFromRMP(professorName) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--disable-popup-blocking"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.ratemyprofessors.com/school/352", { timeout: 50000 });

  const inputElement = await page.$(
    ".Search__DebouncedSearchInput-sc-10lefvq-1"
  );
  await inputElement.type(professorName);

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.keyboard.press("Enter"),
  ]);

  const redirected = page.url();

  // deal with popup
  const closeButtonSelector = '.Buttons__Button-sc-19xdot-1.CCPAModal__StyledCloseButton-sc-10x9kq-2.eAIiLw';

  try {
      // Wait for the close button to appear and then click on it.
      await page.waitForSelector(closeButtonSelector, { timeout: 5000 });
      await page.click(closeButtonSelector);
  } catch (err) {
      console.log("Failed to find or click the close button on pop out", err);
  }

  // console.log(redirected);
  const professorId = await page.$(
    "a.TeacherCard__StyledTeacherCard-syjs0d-0.dLJIlx"
  );
  if (!professorId) {
    await page.screenshot({ path: "unable.png" });
    console.error("Unable to find professor element on the page.");
    await browser.close();
    throw new Error("Failed to retrieve professor URL.");
  }

  const idUrl = await professorId.evaluate((a) => a.href);
  console.log("href: " + idUrl);

  await browser.close();

  return idUrl;
}

/**
 * Finds the corresponding URL for the given professor. Next it scrapes the website to find the reviews.
 * @param {*} professorName name of the professor
 * @returns list of up to 20 most recent reviews
 */
async function getReviewForProfessor(professorName) {
  const url = await getProfessorURLFromRMP(professorName);
  console.log("url: " + url);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--disable-popup-blocking"],
  });

  const page = await browser.newPage();
  // await page.goto("https://www.ratemyprofessors.com/professor/2737110");
  await page.goto(url, { timeout: 50000 }); // 50 seconds

  // await page.screenshot({path: "image.png"});

  // Close starting modal
  try {
    await page.click(
      ".Buttons__Button-sc-19xdot-1.CCPAModal__StyledCloseButton-sc-10x9kq-2.eAIiLw"
    );
  } catch (error) {
    console.error("Error clicking modal:", error);
  }

  // await page.screenshot({path: "image2.png"}); make sure the initial modal is closed.

  const ratingList = await page.waitForSelector("#ratingsList");
  const innerHTML = await ratingList.evaluate((el) => el.innerHTML);
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

  // console.log(listItems);
  await browser.close();

  return reviews;
}

// getReviewForProfessor("Tamara Maddox")
//   .then((reviews) => {
//     console.log("length: " + reviews.length);
//     reviews.forEach(function (review) {
//       console.log(review.classLabel + " review: " + review.review + " rating: "+ review.qualityGrading +
//        " and diff: " + review.difficultyRating +  " label1: " + review.label1 + " label2: " + review.label2 + " label3: " + review.label3 + "\n\n");
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching reviews:", error);
//   });

getReviewForProfessor("Tamara Maddox")
  .then((reviews) => {
    console.log("length: " + reviews.length);
    reviews.forEach(function (review) {
      console.log(reviews);
    });
  })
  .catch((error) => {
    console.error("Error fetching reviews:", error);
  });

// getProfessorURLFromRMP("Dana Richards");

// const prof = getInstructorsFromFile('./patriotWeb_scraper/spring24.json');
