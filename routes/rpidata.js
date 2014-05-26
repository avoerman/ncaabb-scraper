var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');

module.exports = {
    '/rpidata': function(req, res) {
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
                        //we have to use the <td> position since theres no classes on the table
                        team = {
                            rpi: parseInt(tds.eq(0).text()),
                            name: tds.eq(1).text(),
                            conference: tds.eq(4).text(),
                            record: tds.eq(3).text()
                        };
                        teams.push(team);
                    }
                });

                //write the data to a json file
                dumptojson.dump(teams, 'rpidata.json');

                res.send(teams);
            }
        });
    }
};