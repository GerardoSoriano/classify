const puppeteer = require('puppeteer');

/**
 * Creates and returns a browser instance
 * Throws error if it cannot be created
 * @returns browser object
 */
async function startBrowser() {
    try {
        console.log("Opening browser.......");
        browser = await puppeteer.launch( {
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    }
    catch (err) {
        console.log("Could not create a browser instance: ", err);
    }

    return browser;
}

module.exports = {
    startBrowser
};