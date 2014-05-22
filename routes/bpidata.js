var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');

module.exports = {
    '/bpidata': function(req, res) {
        url = 'http://espn.go.com/mens-college-basketball/bpi';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                $('tr.oddrow, tr.evenrow').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();

                    team = {
                        bpi: parseInt(tds.eq(0).text()),
                        name: tds.eq(1).text()
                    };
                    teams.push(team);
                });

                //write the data to a json file
                dumptojson.dump(teams, 'bpidata.json');

                res.send(teams);
            }
        });
    }
};