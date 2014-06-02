var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');
var bpidata = require('../lib/scrapers/bpidata.js');

module.exports = {
    '/bpidata': function(req, res) {
        bpidata.scrape(res, null);
    }
};