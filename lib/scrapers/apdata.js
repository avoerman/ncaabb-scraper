var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');

module.exports = exports = {
    scrape: function(res, callback) {
        url = 'http://espn.go.com/mens-college-basketball/rankings';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                $('.tablehead').first().children().each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();
                    var name = tds.eq(1).text().replace(/ *\([^)]*\) */g, "");
                    if (name && name !== 'TEAM') {
                        team = {
                            aprank: parseInt(tds.eq(0).text()),
                            name: name
                        };
                        teams.push(team);
                    }
                });

                if (callback) callback(null, teams);

                //write the data to a json file
                dumptojson.dump(teams, 'apdata.json');

                if (res) res.send(teams);
            }
        });
    }
}