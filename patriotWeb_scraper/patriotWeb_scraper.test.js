const browserObject = require('./browser');
const scraperController = require('./pageController');
const pageScraper = require('./pageScraper');
const { describe, it, expect } = require('@jest/globals');
const fs = require('fs');
const timer = require('timers/promises');

/************************************************************************
 *                          Browswer Tests
 ************************************************************************
*/

describe('Browser', () => {
    let browserInstance = null;
    
    beforeAll(async () => {
        browserInstance = await browserObject.startBrowser();
    });

    afterAll(() => {
        browserInstance.close();
    })

    it('Create Browser Instance', () => {
        expect(browserInstance).toBeTruthy(); 
    });
});

/**********************************************************************
 *                      Page Controller Tests
 * ********************************************************************
 */

describe('Page Controller', () => {
    jest.setTimeout(20000);
    let browserInstance = null;
    
    beforeAll(async () => {
        browserInstance = await browserObject.startBrowser();
        scraperController(browserInstance);
        await timer.setTimeout(7000);
    });

    afterAll(() => {
        browserInstance.close();
    })

    it('Check if spring24.json file exists', () => {
        expect(fs.existsSync('spring24.json')).toBeTruthy();
    });

    it('Check if spring24.json is nonempty', () => {
       expect(fs.statSync('./spring24.json').size > 0).toBeTruthy();
    });
});

/**********************************************************************
 *                       Page Scraper Tests
 * ********************************************************************
 */

describe('Page Scraper', () => {
    jest.setTimeout(50000);
    let browserInstance, page, courses, rand_course = null;
    
    beforeAll(async() => {
        browserInstance = await browserObject.startBrowser();
        page = await pageScraper.setupPage();
        courses = await pageScraper.scraper(browserInstance);
        
        // select arbitary course
        rand = Math.floor(Math.random() * courses.length);
        rand_course = courses[rand];

        await timer.setTimeout(7000);
    });

    afterAll(() => {
        browserInstance.close();
    });

    it('Get term (Spring 2024)', async() => {
        date = await page.evaluate(() => {
            return document.querySelector(".staticheaders").innerText;
        });
        expect(date.includes("Spring 2024")).toBeTruthy();
    });

    it('Get page title (Class Schedule Listing)', async() => {
        title = await page.evaluate(() => {
            return document.querySelector('.pldefault > h2').innerText;
        });

        expect(title).toBe('Class Schedule Listing');
    });

    it('Get Number of CS Courses', async() => {
        expect(courses.length).toBe(175);
    });

    it('Get course attributes (course name, type, time, days, where, date range, schedule type, instructor)', async() => {
        const keys = ['course name', 'type', 'time', 'days', 'where', 'date range', 'schedule type', 'instructor'];

        for (i = 0; i < keys.length; i++) {
                expect(rand_course).toHaveProperty(keys[i]);
        }
    });

});