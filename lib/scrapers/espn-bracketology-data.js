var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');

module.exports = exports = {
    scrape: function(res, callback) {
        url = 'http://www.espn.go.com/mens-college-basketball/bracketology';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var teams = [];

                //Get the team div, but we still have more work to do
                $('div.team').each(function(i, el) {
                    var teamLines = $(this).children();
                    //Standard line, without 16/11 seeds
                    if (teamLines.length === 3) {
                        var team = {
                            name: teamLines.eq(2).text(),
                            espnBracketologySeed: parseInt(teamLines.eq(1).text())
                        };
                        teams.push(team);
                    }
                    //Multiple teams per line
                    else {
                        var teamA = {
                            name: teamLines.eq(1).text(),
                            espnBracketologySeed: parseInt(teamLines.eq(0).text())
                        };
                        var teamB = {
                            name: teamLines.eq(3).text(),
                            espnBracketologySeed: parseInt(teamLines.eq(2).text())
                        };
                        teams.push(teamA);
                        teams.push(teamB);
                    }

                });

                if (callback) callback(null, teams);

                //write the data to a json file
                dumptojson.dump(teams, 'espn-bracketology-data.json');

                if (res) res.send(teams);
            }
        });
    }
};