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

describe('Page Scraper (Happy Path using CS Dept)', () => {
    jest.setTimeout(100000);
    let browserInstance, data, page, rand_course = null;
    
    beforeAll(async() => {
        browserInstance = await browserObject.startBrowser();
        data = await pageScraper.setupTerm();
        
        page = await pageScraper.setupDept(data.page, "CS");
        cs_dept = await pageScraper.getInfo(page, pageScraper);

        // select arbitary CS course
        rand = Math.floor(Math.random() * cs_dept.length);
        rand_course = cs_dept[rand];

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
        expect(cs_dept.length).toBe(172);
    });

    it('Get course attributes (course name, type, time, days, where, date range, schedule type, instructor)', async() => {
        const keys = ['course name', 'type', 'time', 'days', 'where', 'date range', 'schedule type', 'instructor'];

        for (i = 0; i < keys.length; i++) {
                expect(rand_course).toHaveProperty(keys[i]);
        }
    });

    it('Get number of departments', async() => {
        expect(data.options.length).toBe(150);
    });
});

describe('Page Scraper (Multiple Table Entries using FAVS)', () => {
    jest.setTimeout(50000);
    let browserInstance, data, page = null;
    
    beforeAll(async() => {
        browserInstance = await browserObject.startBrowser();
        data = await pageScraper.setupTerm();

        // Multiple table rows (hybrid) in FAVS 498
        page = await pageScraper.setupDept(data.page, "FAVS");
        favs_dept = await pageScraper.getInfo(page, pageScraper);
        await timer.setTimeout(7000);
    });

    afterAll(() => {
        browserInstance.close();
    });

    it('Get multiple table rows (FAVS 498 = hybrid)', async() => {
        let course = favs_dept[favs_dept.length - 1];
        expect(course['type'].length).toBe(7);
    });
});

describe('Page Scraper (No Table Available using BENG)', () => {
    jest.setTimeout(50000);
    let browserInstance, data, page = null;
    
    beforeAll(async() => {
        browserInstance = await browserObject.startBrowser();
        data = await pageScraper.setupTerm();

        // Multiple table rows (hybrid) in FAVS 498
        page = await pageScraper.setupDept(data.page, "BENG");
        beng_dept = await pageScraper.getInfo(page, pageScraper);
        await timer.setTimeout(7000);
    });

    afterAll(() => {
        browserInstance.close();
    });

    it('Get multiple table rows (BENG 999 = no section info)', async() => {
        let course = beng_dept[beng_dept.length - 1];
        expect(course['type'].length).toBe(0);
    });
});