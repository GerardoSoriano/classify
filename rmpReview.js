"use strict";
const puppeteer = require("puppeteer");
const fs = require('fs'); 
const Review = require("./Review");

const BASE_URL = "https://www.ratemyprofessors.com/";
const POPUP_CLOSE_BUTTON =
  ".Buttons__Button-sc-19xdot-1.CCPAModal__StyledCloseButton-sc-10x9kq-2.eAIiLw";

async function launchBrowser() {
  return puppeteer.launch({
    headless: "new",
    args: ["--disable-setuid-sandbox"],
    'ignoreHTTPSErrors': true
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

  if(professorName == "") {
    throw new Error("Professor name cannot be empty");
  }
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
  // await page.goto(url, { timeout: 50000 });
  await page.goto(url, { timeout: 60000, waitUntil: 'networkidle2' });

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

// getProfessorURLFromRMP("").then((link) => {
//   console.log("link is:", link);
// });

// getProfessorOverallRating("Dana Richards")
//   .then((rating) => {
//     console.log("Rating is: " + rating);
//   })
//   .catch((error) => {
//     console.error("Error fetching reviews:", error.stack);
//     // error.page.screenshot({path: 'error_screenshot.png'});
//   });

let rev = [];
let organizedReviews = {};


getReviewForProfessor("Tamara Maddox")
  .then((reviews) => {
    console.log("length: " + reviews.length);
    reviews.forEach(function (review) {
      let professorName = "Tamara Maddox";
      let course = review._class; /* Course taught by profesor */

      // Check if the professor's name is already a key in the organizedReviews
      if (!organizedReviews[professorName]) {
        organizedReviews[professorName] = {}; // Initialize an empty object for this professor
      }

      // Check if the course already exists under the professor
      if (!organizedReviews[professorName][course]) {
        organizedReviews[professorName][course] = []; // Initialize an empty array for this course
      }

      // Add the review to the course
      organizedReviews[professorName][course].push({
        review: review._review,
        qualityGrading: review._qualityGrading,
        difficultyRating: review._difficultyRating,
        labels: [review._label1, review._label2, review._label3].filter(Boolean) // Filter out any undefined labels
      });
      // console.log(reviews);
      // rev.push(review);

      // console.log(JSON.stringify(organizedReviews, null, 2));
      fs.writeFile('organizedReviews.json', JSON.stringify(organizedReviews, null, 2), 'utf8', function(err) {
        if (err) {
          console.error("An error occurred while writing JSON Object to File.", err);
        } else {
          console.log("JSON file has been saved.");
        }
      });

    });

    // let last = rev[rev.length - 1]
    // console.log("last review is: " + last._review);
  })
  .catch((error) => {
    console.error("Error fetching reviews:", error.stack);
    // error.page.screenshot({path: 'error_screenshot.png'});
  });




module.exports = {
  getProfessorURLFromRMP,
  getProfessorOverallRating,
  getReviewForProfessor,
};
