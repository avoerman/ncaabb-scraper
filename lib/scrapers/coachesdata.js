var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');
var _ = require('underscore');

module.exports = exports = {
    scrape: function(res, callback) {
        url = 'http://espn.go.com/mens-college-basketball/rankings';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                $('.tablehead').last().children().each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();
                    var name = tds.eq(1).text().replace(/ *\([^)]*\) */g, "");
                    if (name && name !== 'TEAM') {
                        team = {
                            coachesRank: parseInt(tds.eq(0).text()),
                            name: name
                        };
                        teams.push(team);
                    }
                });

                var footer = $('.foot-content').last();
                var othersText = $(footer).children().first().text();
                var otherTeamsArray = othersText.trim().split('Others receiving votes: ')[1].split(", ");

                var otherRank = 26;

                _.each(otherTeamsArray, function(el) {
                    var name = el.replace(/[0-9]/g, '').trim();
                    team = {
                        name: name,
                        coachesRank: otherRank
                    }
                    teams.push(team);
                    otherRank++;
                });

                if (callback) callback(null, teams);

                //write the data to a json file
                dumptojson.dump(teams, 'coachesdata.json');

                if (res) res.send(teams);
            }
        });
    }
}