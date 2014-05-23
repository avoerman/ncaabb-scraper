var request = require('request');
var cheerio = require('cheerio');
var dumptojson = require('../lib/dump-to-json.js');

module.exports = {
    '/bracketmatrixdata': function(req, res) {
        url = 'http://bracketmatrix.com/';
        request(url, function(err, response, html) {
            console.log('request made');
            if (!err) {
                var $ = cheerio.load(html);
                var team;
                var teams = [];
                var sixteenCount = 0;

                //loop through and remove <tr> tags untill we get to first seed
                $('tr').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();
                    if (tds.eq(0).text() === "1") {
                        return false;
                    } else {
                        $(this).remove();
                    }
                });

                //loop through remaining set of tr tags
                $('tr').each(function(i, el) {
                    var tr = $(this);
                    var tds = tr.children();
                    var seed = parseInt(tds.eq(0).text());
                    team = {
                        bm_seed: seed,
                        name: tds.eq(1).text()
                    };
                    teams.push(team);

                    //For now, go until we get to the last 16 seed.
                    //In the future, we want to grab the rest of the teams.
                    if (seed === 16) sixteenCount++;
                    if (sixteenCount > 5) return false;
                });

                //write the data to a json file
                dumptojson.dump(teams, 'bracketmatrixdata.json');

                res.send(teams);
            }
        });
    }
};