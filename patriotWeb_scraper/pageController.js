const pageScraper = require('./pageScraper');
fs = require('fs');

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let scrapedData = {};
        scrapedData['CS'] = await pageScraper.scraper(browser);
        fs.writeFile("spring24.json", JSON.stringify(scrapedData), 'utf8', function(err) {
            if (err) return console.log(err);
            console.log("Data has been successfully scraped. View at './spring24.json'");
        });
    }
    catch (err) {
        console.log("Could not resolve browser instance: ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)