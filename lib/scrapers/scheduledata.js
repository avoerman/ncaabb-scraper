var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../dump-to-json.js');
var fs = require('fs');

module.exports = exports = {
    scrape: function(res, callback) {
        var allteams = './data/input/allteams.json';
        fs.readFile(allteams, 'utf8', function(err, data) {
            if (err) throw err;
            var teams = JSON.parse(data);

            var outputTeams = [];
            var iterator = 0;
            var teamLength = teams.length;
            teams.forEach(function(team) {
                var url = 'http://www.rpiforecast.com/teams/' + team.name + '.html';
                request(url, function(err, response, html) {
                    iterator += 1;
                    if (err) throw err;
                    var $ = cheerio.load(html);

                    var schedule = [];
                    $('table').first().remove();
                    $('table').first().remove();
                    $('table').last().remove();
                    $('tr').first().remove();
                    $('tr').each(function(i, el) {

                        var tr = $(this);
                        var tds = tr.children();
                        if (tds.length === 8) {
                            var rpi = tds.eq(1).text().match(/\(([^)]+)\)/)[1];
                            var scheduleObj = {
                                date: tds.eq(0).text(),
                                opponent: tds.eq(1).children().eq(0).text(),
                                rpi: rpi,
                                conference: tds.eq(2).text(),
                                location: tds.eq(3).text(),
                                score: tds.eq(4).text(),
                                outcome: tds.eq(5).text()
                            };
                            schedule.push(scheduleObj);
                        }
                    });
                    var outputTeam = {
                        name: team.name,
                        schedule: schedule
                    };
                    outputTeams.push(outputTeam);
                    console.log('Scraped: ' + team.name);
                    if (teamLength === iterator) {
                        finalCallback(outputTeams, res);
                    }
                });
            });
        });
    }
};

function finalCallback(outputTeams, res) {
    dumptojson.dump(outputTeams, 'scheduledata.json');
    res.send(outputTeams);
}