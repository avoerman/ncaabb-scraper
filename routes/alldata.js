var fs = require('fs');
var _ = require('underscore');
var rpiscraper = require('../lib/scrapers/rpidata.js');
var bpiscraper = require('../lib/scrapers/bpidata.js');
var kpomscraper = require('../lib/scrapers/kenpomdata.js');
var bmscraper = require('../lib/scrapers/bracketmatrixdata.js');
var espnBtScraper = require('../lib/scrapers/espn-bracketology-data.js');
var apscraper = require('../lib/scrapers/apdata.js');
var coachesScraper = require('../lib/scrapers/coachesdata.js');
var dumptojson = require('../lib/dump-to-json.js');

var async = require('async');

module.exports = {
    '/alldata': function(req, res) {
        async.parallel([

            function(callback) {
                rpiscraper.scrape(null, callback);
            },
            function(callback) {
                bpiscraper.scrape(null, callback);
            },
            function(callback) {
                kpomscraper.scrape(null, callback);
            },
            function(callback) {
                bmscraper.scrape(null, callback);
            },
            function(callback) {
                espnBtScraper.scrape(null, callback);
            },
            function(callback) {
                apscraper.scrape(null, callback);
            },
            function(callback) {
                coachesScraper.scrape(null, callback);
            }
        ], function(err, result) {
            var allteams = './data/input/allteams.json';

            fs.readFile(allteams, 'utf8', function(err, data) {
                if (err) throw err;

                var newteams = JSON.parse(data);
                var outputteams = [];

                var rpiteams = result[0];
                var bpiteams = result[1];
                var kpomteams = result[2];
                var bmteams = result[3];
                var espnBtTeams = result[4];
                var apteams = result[5];
                var coachesTeams = result[6];

                newteams.forEach(function(team) {
                    var bpiteam = _.findWhere(bpiteams, {
                        name: team.bpi_name
                    });
                    var rpiteam = _.findWhere(rpiteams, {
                        name: team.name
                    });
                    var kpomteam = _.findWhere(kpomteams, {
                        name: team.kpom_name
                    });
                    var bmteam = (team.bm_name) ? _.findWhere(bmteams, {
                        name: team.bm_name
                    }) : null;
                    var apteam = _.findWhere(apteams, {
                        name: team.bpi_name
                    });
                    var coachesTeam = _.findWhere(coachesTeams, {
                        name: team.bpi_name
                    });
                    var espnBtTeam = _.filter(espnBtTeams, function(fteam){
                        return team.bpi_name.toLowerCase() === fteam.name.toLowerCase();
                    });

                    var newteam = {
                        name: team.name,
                        record: (rpiteam ? rpiteam.record : null),
                        wins: (rpiteam ? rpiteam.wins : null),
                        losses: (rpiteam ? rpiteam.losses : null),
                        conference: (rpiteam ? rpiteam.conference : null),
                        rpi: (rpiteam ? rpiteam.rpi : null),
                        bpi: (bpiteam ? bpiteam.bpi : null),
                        kpom: (kpomteam ? kpomteam.kpom : null),
                        bm_seed: (bmteam ? bmteam.bm_seed : null),
                        bm_avgseed: (bmteam ? bmteam.bm_avgseed : null),
                        bm_numbrackets: (bmteam ? bmteam.bm_numbrackets : null),
                        bm_numbrackets: (bmteam ? bmteam.bm_numbrackets : null),
                        espnBracketologySeed: (espnBtTeam.length > 0) ? espnBtTeam[0].espnBracketologySeed : null,
                        aprank: (apteam ? apteam.aprank : null),
                        coachesRank: (coachesTeam ? coachesTeam.coachesRank : null)
                    };

                    outputteams.push(newteam);
                });

                outputteams = sortByRPIBPIKPOMAverage(outputteams);

                dumptojson.dump(outputteams, 'alldata.json');
                res.send(outputteams);
            });

        });
    }
};

/* Sorts array by RPI, BPI, and KPOM average if they exist */
function sortByRPIBPIKPOMAverage(teams) {
    return _.sortBy(teams, function(team) {
        var r = team.rpi ? 1 : 0;
        var b = team.bpi ? 1 : 0;
        var k = team.kpom ? 1 : 0;
        var sum = r + b + k;
        var tot = (team.rpi ? team.rpi : 0) + (team.bpi ? team.bpi : 0) + (team.kpom ? team.kpom : 0);
        return tot / sum;
    });
}