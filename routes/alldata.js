var dumptojson = require('../lib/dump-to-json.js');
var fs = require('fs');
var _ = require('underscore');

module.exports = {
    '/alldata': function(req, res) {

        var allteams = './data/input/allteams.json';

        var bpidata = './data/bpidata.json';
        var rpidata = './data/rpidata.json';
        var kenpomdata = './data/kenpomdata.json';
        var bracketmatrixdata = './data/bracketmatrixdata.json';

        fs.readFile(allteams, 'utf8', function(err, data) {
            if (err) throw err;

            var newteams = JSON.parse(data);
            var outputteams = [];

            //For now, we'll just import the existing json files. In future these should be requests.
            var bpiteams = JSON.parse(fs.readFileSync(bpidata, 'utf8'));
            var rpiteams = JSON.parse(fs.readFileSync(rpidata, 'utf8'));
            var kpomteams = JSON.parse(fs.readFileSync(kenpomdata, 'utf8'));
            var bmteams = JSON.parse(fs.readFileSync(bracketmatrixdata, 'utf8'));

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

                var newteam = {
                    name: team.name,
                    rpi: (rpiteam ? rpiteam.rpi : null),
                    bpi: (bpiteam ? bpiteam.bpi : null),
                    kpom: (kpomteam ? kpomteam.kpom : null),
                    bm_seed: (bmteam ? bmteam.bm_seed : null),
                    bm_avgseed: (bmteam ? bmteam.bm_avgseed : null),
                    bm_numbrackets: (bmteam ? bmteam.bm_numbrackets : null)
                };

                outputteams.push(newteam);
            });

            outputteams = sortByRPIBPIKPOMAverage(outputteams);

            dumptojson.dump(outputteams, 'alldata.json');
            res.send(outputteams);
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