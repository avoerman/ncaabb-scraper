var request = require('request');
var cheerio = require('cheerio');
var scraper = require('../lib/scrapers/espn-bracketology-data.js');

module.exports = {
    '/espn-bracketology-data': function(req, res) {
        scraper.scrape(res, null);
    }
};