var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');
var bracketmatrixdata = require('../lib/scrapers/bracketmatrixdata.js');

module.exports = {
    '/bracketmatrixdata': function(req, res) {
        bracketmatrixdata.scrape(res, null);
    }
};