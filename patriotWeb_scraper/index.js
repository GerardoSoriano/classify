const browserObject = require('./browser');
const scraperController = require('./pageController');

// Start browser and crate browser instance
let browserInstance = browserObject.startBrowser();

// Pass browser instance to scraper controller
scraperController(browserInstance)