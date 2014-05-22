var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    '/kenpomdata': function(req, res) {
        url = 'http://kenpom.com/';
        request(url, function(err, response, html) {
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];

                $('tbody tr').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();

                    //we have to use the <td> position since theres no classes on the table
                    //also, get the team name from the <a> tag because seeds will appear next to team
                    team = {
                        kpom: parseInt(tds.eq(0).text()),
                        name: tds.children().eq(0).text()
                    };
                    teams.push(team);
                });

                //write the data to a json file
                fs.writeFile('./data/kenpomdata.json', JSON.stringify(teams, null, 0), function(err) {
                    if (err) console.log('Error writing file');
                });

                res.send(teams);
            }
        });
    }
};