"use strict";

const puppeteer = require("puppeteer")

/**
 * 
 * @param {*} professorName name of the professor.
 * @returns the url that contains the professor profile.
 */
async function getProfessorURLFromRMP(professorName) {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto("https://www.ratemyprofessors.com/school/352");

    const inputElement = await page.$('.Search__DebouncedSearchInput-sc-10lefvq-1');
    await inputElement.type(professorName);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.keyboard.press('Enter')
      ]);

    const redirected = page.url();

    console.log(redirected);
    const professorId = await page.$("a.TeacherCard__StyledTeacherCard-syjs0d-0.dLJIlx");
    const idUrl = await professorId.evaluate(a => a.href);
    console.log("href: " + idUrl);
    
    await browser.close();
    
    return idUrl;
}

/**
 * 
 * @param {*} professorName name of the professor 
 * @returns list of up to 20 most recent reviews 
 */
async function getReviewForProfessor(professorName) {
    const url = await getProfessorURLFromRMP(professorName);
    console.log("url: " + url);
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    // await page.goto("https://www.ratemyprofessors.com/professor/2737110");
    await page.goto(url);
   
    // await page.screenshot({path: "image.png"});
   
    // Close starting modal 
    try {
        await page.click('.Buttons__Button-sc-19xdot-1.CCPAModal__StyledCloseButton-sc-10x9kq-2.eAIiLw');
    } catch (error) {
        console.error('Error clicking modal:', error);
    }

    // await page.screenshot({path: "image2.png"}); make sure the initial modal is closed.

    const ratingList = await page.waitForSelector("#ratingsList");
    // const innerHTML = await ratingList.evaluate(el => el.innerHTML);
    const listItems = await ratingList.$$eval('li', lis => lis.map(li => {
            const divReview = li.querySelector('.Comments__StyledComments-dzzyvm-0.gRjWel');
            return divReview ? divReview.textContent : null;
        }).filter(text => text !== null)
    );

    // console.log(listItems);
    await browser.close();

    return listItems;
  }


  getReviewForProfessor("Tamara Maddox")
  .then(reviews => {
      console.log("length: " + reviews.length);
      reviews.forEach(function(review) {
        console.log(review + "\n\n");
      })
  })
  .catch(error => {
      console.error('Error fetching reviews:', error);
  });



// getProfessorURLFromRMP("Dana Richards");

// const prof = getInstructorsFromFile('./patriotWeb_scraper/spring24.json');
