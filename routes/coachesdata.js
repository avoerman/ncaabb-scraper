var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');
var coachesdata = require('../lib/scrapers/coachesdata.js');

module.exports = {
    '/coachesdata': function(req, res) {
        coachesdata.scrape(res, null);
    }
};