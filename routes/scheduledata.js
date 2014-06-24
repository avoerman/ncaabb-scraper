var scheduledata = require('../lib/scrapers/scheduledata.js');

module.exports = {
    '/scheduledata': function(req, res) {
        scheduledata.scrape(res, null);
    }
};