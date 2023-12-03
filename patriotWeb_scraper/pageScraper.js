const scraperObject = {
    url: 'https://patriotweb.gmu.edu/pls/prod/bwckschd.p_disp_dyn_sched',

    async setupTerm() {
        var data = {};
        let page = await browser.newPage();
        console.log('Accessing ' + this.url);
        await page.goto(this.url, { waitUntil: "domcontentloaded", });

        // Select "Spring 2024" term
        var select_term = await page.$('select[name="p_term"]');
        await select_term.type('Spring 2024 (View only)');

        // Click submit to proceed to departments page
        var submit_button = await page.$('input[value="Submit"]');  // Factor into button func
        await submit_button.click();

        // Update new page instance
        await page.waitForNavigation();
        console.log('Accessing ' + page.url());
        data.page = page;

        // Get all dept select options
        data.options = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("#subj_id option")).map(element => element.value)
        });
        
        return data;
    },

    /**
     * Get to Department Page (hardcoded to be CS for right now)
     * @returns page object of current page
     */
    async setupDept(page, dept) {
        // Scrape CS courses (test run; hardcoded) + go to next page
        await page.select('#subj_id', dept);
        var submit_button = await page.$('input[value="Class Search"]'); // Factor into button func
        await submit_button.click();
        await page.waitForNavigation();

        return page;
    },

    async getInfo(page, scraperObject) {
        // Get dept data
        console.log("in getInfo");
        const courses = await page.evaluate((scraperObject) => {
            const dept = document.querySelector(".pagebodydiv");
            console.log("here 0");
            const courseList = dept.querySelectorAll(".ddtitle > a");
            console.log("here 1");
            const termDesc = dept.querySelectorAll("div.pagebodydiv > table.datadisplaytable > tbody > tr > .dddefault");
            console.log("here 2");
            var courseInfo = [];
            
            // build inner array: [name, term, description]
            for (i = 0; i < courseList.length; i++) {
                var inner = [ courseList[i], termDesc[i * 2], termDesc[(i * 2) + 1] ];
                courseInfo.push(inner); 
            }

            // Scrape individual courses
            return Array.from(courseInfo).map((course) => { 
                var dataObj = {
                    'course name' : "",
                    'type' : [],
                    'time' : [],
                    'days' : [],
                    'where' : [],
                    'date range' : [],
                    'schedule type' : [],
                    'instructor' : []
                };

                // Get course name
                var courseName = course[0].innerText;
                dataObj['course name'] = courseName;

                // Get table entries
                var table = course[2].querySelector(".datadisplaytable > tbody");

                if (table != null) {
                    var trs = Array.from(table.querySelectorAll("tr"));

                    // Get info from each row; skip headers
                    // Only returns info from the 2nd row (if multiple rows are needed, use array)
                    // Not necessary right now
                    for (j = 1; j < trs.length; j++) {
                        const entries = Array.from(trs[j].querySelectorAll(".dddefault"));
                        dataObj['type'].push(entries[0].innerText);
                        dataObj['time'].push(entries[1].innerText);
                        dataObj['days'].push(entries[2].innerText);
                        dataObj['where'].push(entries[3].innerText);
                        dataObj['date range'].push(entries[4].innerText);
                        dataObj['schedule type'].push(entries[5].innerText);
                        dataObj['instructor'].push(entries[6].innerText);
                    }
                }
                return dataObj;
            });
        });

        console.log(courses);   // Print to terminal
        return courses;
    },

    /**
     * Collects all of the course info on a certain page
     * @param {*} browser = unused (as of right now)
     * @returns = an array of all the course info (mapped w/ name, type, time, etc.)
     */
    async scraper(browser) {
        let data = await scraperObject.setupTerm();
        let scrapedData = {};
        //console.log(data.options);
        
       
        
        for (i = 0; i < data.options.length; i++) {
            var dept = data.options[i];
            var page = await scraperObject.setupDept(data.page, dept);
            scrapedData[dept] = await this.getInfo(page, scraperObject);
            await page.goBack();
        }
        

        /*
        var dept = "BENG"
        var page = await scraperObject.setupDept(data.page, dept);
        scrapedData[dept] = await this.getInfo(page, scraperObject);
        await page.goBack();
        */
    
       return scrapedData;
    },
}

module.exports = scraperObject;
