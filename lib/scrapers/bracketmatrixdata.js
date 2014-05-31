var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');

module.exports = exports = {
    scrape: function(res, callback) {
        url = 'http://bracketmatrix.com/';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                //loop through and remove <tr> tags untill we get to first seed
                $('tr').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();
                    if (tds.eq(0).text() === '1') {
                        return false;
                    } else {
                        $(this).remove();
                    }
                });

                //loop through remaining set of tr tags
                $('tr').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();
                    var name = tds.eq(1).text();

                    //Break at the end of the grid
                    if (!name) return false;

                    //Skip this record
                    if (tds.eq(1).text() != 'OTHERS RECEIVING VOTES') {

                        var seed = parseInt(tds.eq(0).text());
                        var avgseed = parseFloat(tds.eq(3).text());
                        var numbrackets = parseInt(tds.eq(4).text());
                        team = {
                            bm_seed: (seed ? seed : null),
                            bm_avgseed: avgseed,
                            bm_numbrackets: numbrackets,
                            name: name
                        };
                        teams.push(team);

                    }
                });
                if (callback) callback(null, teams);

                //write the data to a json file
                dumptojson.dump(teams, 'bracketmatrixdata.json');

                if (res) res.send(teams);
            }
        });
    }
};