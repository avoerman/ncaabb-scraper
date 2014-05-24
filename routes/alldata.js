var dumptojson = require('../lib/dump-to-json.js');
var fs = require('fs');
var _ = require('underscore');
var allteams = './data/allteams.json';
var bpidata = './data/bpidata.json';
var rpidata = './data/rpidata.json';
var kenpomdata = './data/kenpomdata.json';
var bracketmatrixdata = './data/bracketmatrixdata.json';

module.exports = {
    '/alldata': function(req, res) {

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

                var bpiteam = _.findWhere(bpiteams, { name: team.bpi_name} );
                var rpiteam = _.findWhere(rpiteams, { name: team.name} );
                var kpomteam = _.findWhere(kpomteams, { name: team.kpom_name} );
                var bmteam = (team.bm_name) ? _.findWhere(bmteams, { name: team.bm_name} ) : null;

                var newteam = {
                    name: team.name,
                    rpi: (rpiteam ? rpiteam.rpi : null),
                    bpi: (bpiteam ? bpiteam.bpi : null),
                    kpom: (kpomteam ? kpomteam.kpom : null),
                    bm_seed: (bmteam ? bmteam.bm_seed : null)
                };
                outputteams.push(newteam);
            });

            dumptojson.dump(outputteams, 'alldata.json');
            res.send(outputteams);
        });
    }
};
