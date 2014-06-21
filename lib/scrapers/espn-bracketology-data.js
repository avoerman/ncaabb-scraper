var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');

module.exports = exports = {
    scrape: function(res, callback) {
        url = 'http://www.espn.go.com/mens-college-basketball/bracketology';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                //This one is easy... espn actually included classes!
                $('div.team a').each(function(i, el) {
                    var a = $(this);
                    team = {
                        name: a.text()
                    };
                    teams.push(team);
                });

                $('div.team .rank').each(function(i, el) {
                    var span = $(this);
                    teams[i].espnBracketologySeed = parseInt(span.text())

                });

                if (callback) callback(null, teams);

                //write the data to a json file
                dumptojson.dump(teams, 'espn-bracketology-data.json');

                if (res) res.send(teams);
            }
        });
    }
};