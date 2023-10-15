const scraperObject = {
    url: 'https://patriotweb.gmu.edu/pls/prod/bwckschd.p_disp_dyn_sched',

    myTest: function() {
      console.log("Testing...");  
    },

    async setupPage() {
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

        // Scrape CS courses (test run; hardcoded) + go to next page
        await page.select('#subj_id', 'CS');
        var submit_button = await page.$('input[value="Class Search"]'); // Factor into button func
        await submit_button.click();
        await page.waitForNavigation();

        return page;
    },

    async scraper(browser) {
       let page = await scraperObject.setupPage();

        // Get dept data
        const courses = await page.evaluate((scraperObject) => {
            const dept = document.querySelector(".pagebodydiv");
            const courseList = dept.querySelectorAll(".ddtitle > a");
            const termDesc = dept.querySelectorAll("div.pagebodydiv > table.datadisplaytable > tbody > tr > .dddefault");
            var courseInfo = [];
            
            // build inner array: [name, term, description]
            for (i = 0; i < courseList.length; i++) {
                var inner = [ courseList[i], termDesc[i * 2], termDesc[(i * 2) + 1] ];
                courseInfo.push(inner); 
            }

            // Scrape individual courses
            return Array.from(courseInfo).map((course) => { 
                var courseName = course[0].innerText;
                var table = course[2].querySelector(".datadisplaytable > tbody");
                var trs = Array.from(table.querySelectorAll("tr"));

                // Get info from each row; skip headers
                // Only returns info from the 2nd row (if multiple rows are needed, use array)
                // Not necessary right now
                for (j = 1; j < trs.length; j++) {
                    const dataObj = {};
                    const entries = Array.from(trs[j].querySelectorAll(".dddefault"));
                    dataObj['course name'] = courseName;
                    dataObj['type'] = entries[0].innerText;
                    dataObj['time'] = entries[1].innerText;
                    dataObj['days'] = entries[2].innerText;
                    dataObj['where'] = entries[3].innerText;
                    dataObj['date range'] = entries[4].innerText;
                    dataObj['schedule type'] = entries[5].innerText;
                    dataObj['instructor'] = entries[6].innerText;
                    return dataObj;
                }
            });
        });

        console.log(courses);   // Print to terminal
        console.log("done");
        return courses;
    },
}

module.exports = scraperObject;
