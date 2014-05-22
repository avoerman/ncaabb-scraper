var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

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

                    //we have to use the <td> position since theres no classes on the table
                    team = {
                        rpi: parseInt(tds.eq(0).text()),
                        name: tds.eq(1).text(),
                        conference: tds.eq(4).text(),
                        record: tds.eq(3).text()
                    };
                    teams.push(team);
                });

                //write the data to a json file
                fs.writeFile('./data/rpidata.json', JSON.stringify(teams, null, 0), function(err) {
                    if (err) console.log('Error writing file');
                });

                res.send(teams);
            }
        });
    }
};