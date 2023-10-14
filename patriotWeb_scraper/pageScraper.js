const scraperObject = {
    url: 'https://patriotweb.gmu.edu/pls/prod/bwckschd.p_disp_dyn_sched',

    async scraper(browser) {
        let page = await browser.newPage();
        console.log('Accessing %s...', this.url);
        await page.goto(this.url, { waitUntil: "domcontentloaded", });

        // Select "Spring 2024" term
        var select_term = await page.$('select[name="p_term"]');
        await select_term.type('Spring 2024 (View only)');

        // Click submit to proceed to departments page
        var submit_button = await page.$('input[value="Submit"]');  // Factor into button func
        await submit_button.click();

        // Update new page instance
        await page.waitForNavigation();
        console.log(page.url());

        // Scrape CS courses (test run; hardcoded) + go to next page
        await page.select('#subj_id', 'CS');
        var submit_button = await page.$('input[value="Class Search"]'); // Factor into button func
        await submit_button.click();
        await page.waitForNavigation();

        /*
        // Get dept data
        const courses = await page.evaluate(() => {
            const courseList = document.querySelector(".pagebodydiv");
            const courseName = courseList.querySelector(".ddtitle > a").innerText;

            const termDesc = courseList.querySelectorAll(".dddefault");
            
            for (i = 1; i < termDesc.length; i += 2) {    // check the first class only; skip "Associated Term" block
                var currDesc = termDesc[i];
                var table = currDesc.querySelector(".datadisplaytable > tbody");
                var trs = Array.from(table.querySelectorAll("tr"));
                //return trs.map(tr => tr.innerText);

                // Get info from each row; skip headers
                for (j = 1; j < trs.length; j++) {
                    const entries = trs[j].querySelectorAll(".dddefault");
                    const type = entries[0].innerText;
                    const time = entries[1].innerText;
                    const days = entries[2].innerText;
                    const where = entries[3].innerText;
                    const dateRange = entries[4].innerText;
                    const scheduleType = entries[5].innerText;
                    const instructor = entries[6].innerText;
                    return { courseName, type, time, days, where, dateRange, scheduleType, instructor };
                }
                //return table.innerHTML;
                var table_entries = table.querySelectorAll(".dddefault");
            }

            //const table = description.querySelector(".datadisplaytable > tbody");
            //const table_entries = table.querySelectorAll(".dddefault");


            //return courseName;
            return termDesc;
        });

        */

        // Get dept data
        const courses = await page.evaluate(() => {
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
