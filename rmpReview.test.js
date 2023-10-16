const rmpReview = require("./rmpReview");
const puppeteer = require("puppeteer");

const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");

describe("RMP Review Tests", () => {

  let page;
  let browser; 

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('https://www.ratemyprofessors.com/');
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });
  
  test("should return the correct URL for Prof. Maddox", async () => {
    const result = await rmpReview.getProfessorURLFromRMP('Tamara Maddox', page);
    expect(result).toBe("https://www.ratemyprofessors.com/professor/56670");
  });

  test("should throw an error for empty professor name", async () => {
    await expect(rmpReview.getProfessorURLFromRMP('', page)).rejects.toThrow("Professor name cannot be empty");
  });

  test("should return the correct overall rating for Prof. Maddox", async () => {
    const result = await rmpReview.getProfessorOverallRating('Tamara Maddox', page);
    expect(result).toBe("3.5");
  });

  test("should throw an error for empty professor name", async () => {
    await expect(rmpReview.getProfessorOverallRating('', page)).rejects.toThrow("Professor name cannot be empty");
  });

});
