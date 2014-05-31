var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');

module.exports = exports = {
    scrape: function(res, callback) {
        url = 'http://kenpom.com/';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                $('tbody tr').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();

                    //make sure we dont return column headers
                    if (tds.eq(0).text() && tds.eq(0).text() != 'Rank') {
                        //we have to use the <td> position since theres no classes on the table
                        //also, get the team name from the <a> tag because seeds will appear next to team
                        team = {
                            kpom: parseInt(tds.eq(0).text()),
                            name: tds.children().eq(0).text()
                        };
                        teams.push(team);
                    }
                });
                if (callback) callback(null, teams);

                //write the data to a json file
                dumptojson.dump(teams, 'kenpomdata.json');

                if (res) res.send(teams);
            }
        });
    }
};