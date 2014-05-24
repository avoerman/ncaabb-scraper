var dumptojson = require('../lib/dump-to-json.js');
var fs = require('fs');
var _ = require('underscore');
var allteams = './data/allteams.json';
var bpidata = './data/bpidata.json';
var rpidata = './data/rpidata.json';
var kenpomdata = './data/kenpomdata.json';

module.exports = {
    '/alldata': function(req, res) {

        fs.readFile(allteams, 'utf8', function(err, data) {
            if (err) throw err;

            var newteams = JSON.parse(data);
            var outputteams = [];

            //For now, we'll just import the existing json files. In future these should be requests.
            var bpiteams = JSON.parse(fs.readFileSync(bpidata, 'utf8'));
            var rpiteams = JSON.parse(fs.readFileSync(rpidata, 'utf8'));
            var kenpomteams = JSON.parse(fs.readFileSync(kenpomdata, 'utf8'));

            newteams.forEach(function(team) {

                var bpiteam = _.findWhere(bpiteams, { name: team.bpi_name} );
                var rpiteam = _.findWhere(rpiteams, { name: team.name} );
                //var kenpomteam = _.findWhere(kenpomteams, { name: team.kenpom_name} );

                var newteam = {
                    name: team.name,
                    rpi: (rpiteam ? rpiteam.rpi : null),
                    bpi: (bpiteam ? bpiteam.bpi : null),
                    //kenpom: kenpomteam.kenpom
                };
                outputteams.push(newteam);
            });

            dumptojson.dump(outputteams, 'alldata.json');
            res.send(outputteams);
        });
    }
};
