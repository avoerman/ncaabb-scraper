var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

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
                fs.writeFile('../data/bpidata.json', JSON.stringify(teams, null, 0), function(err) {
                    if (err) console.log('Error writing file');
                });

                res.send(teams);
            }
        });
    }
};