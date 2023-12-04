const pageScraper = require('./pageScraper');
fs = require('fs');

/**
 * Controls which pages are being scrapped and writes the data to "spring24.json"
 * Throws error if page cannot be scraped or file cannot be written
 * @param {*} browserInstance = window where scraping will be done
 */
async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let scrapedData = await pageScraper.scraper(browser);
        
        fs.writeFile("spring24.json", JSON.stringify(scrapedData), 'utf8', function(err) {
            if (err) return console.log(err);
            console.log("Data has been successfully scraped. View at './spring24.json'");
        });
        browser.close();
    }
    catch (err) {
        console.log("Could not resolve browser instance: ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)