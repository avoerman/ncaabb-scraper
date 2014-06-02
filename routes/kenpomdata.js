var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');
var kenpomdata = require('../lib/scrapers/kenpomdata.js');

module.exports = {
    '/kenpomdata': function(req, res) {
        kenpomdata.scrape(res, null);
    }
};