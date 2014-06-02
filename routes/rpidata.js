var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');
var rpidata = require('../lib/scrapers/rpidata.js');

module.exports = {
    '/rpidata': function(req, res) {
        rpidata.scrape(res, null);
    }
};