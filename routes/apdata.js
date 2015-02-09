var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');
var apdata = require('../lib/scrapers/apdata.js');

module.exports = {
    '/apdata': function(req, res) {
        apdata.scrape(res, null);
    }
};