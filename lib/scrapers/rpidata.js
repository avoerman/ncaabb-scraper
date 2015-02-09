var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');

module.exports = exports = {
    scrape: function(res, callback) {
        url = 'http://www.rpiforecast.com/live-rpi.html';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                //remove the first table header row
                $('tr').first().remove();

                $('tr').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();

                    if (tds.eq(0).text() != 'Rank') {
                        var record = tds.eq(3).text().trim();

                        var recSplit = record.split(/\s*\-\s*/g);
                        var wins, losses;
                        if (recSplit && recSplit.length > 1) {
                            wins = parseInt(recSplit[0]);
                            losses = parseInt(recSplit[1]);
                        }

                        //we have to use the <td> position since theres no classes on the table
                        team = {
                            rpi: parseInt(tds.eq(0).text()),
                            name: tds.eq(1).text(),
                            conference: tds.eq(4).text(),
                            record: record,
                            wins: wins,
                            losses: losses
                        };
                        teams.push(team);
                    }
                });
                if (callback) callback(null, teams);

                //write the data to a json file
                dumptojson.dump(teams, 'rpidata.json');

                if (res) res.send(teams);
            }
        });
    }
}