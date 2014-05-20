var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

/* We're grabbing metrics from rpiforecast. This will also grab the conference and record. */
app.get('/rpidata', function(req, res) {
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
                    rpi: tds.eq(0).text(),
                    name: tds.eq(1).text(),
                    conference: tds.eq(4).text(),
                    record: tds.eq(3).text()
                };
                teams.push(team);
            });

            //write the data to a json file
            fs.writeFile('data/rpidata.json', JSON.stringify(teams, null, 0), function(err) {
                if (err) console.log('Error writing file');
            });

            //just return the data I guess
            res.send(teams);
        }
    });
});

/* We have to keep these as separate requests because of school name differences */
app.get('/kenpomdata', function(req, res) {

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
            fs.writeFile('data/kenpomdata.json', JSON.stringify(teams, null, 0), function(err) {
                if (err) console.log('Error writing file');
            });

            //just return the data I guess
            res.send(teams);
        }
    });
});


app.listen('3001');

console.log('--------------------------------');
console.log('-----Listening on port 3001-----');
console.log('--------------------------------');

exports = module.exports = app;