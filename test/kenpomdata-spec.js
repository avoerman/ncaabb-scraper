var request = require('request');

describe('kenpomdata', function(abc) {
    it('should test the teams from kenpom were correctly scraped', function(done) {
        request('http://localhost:3000/kenpomdata', function(error, response, body) {
            var teams = JSON.parse(body);
            var firstTeam = teams[0];
            var lastTeam = teams[350];
            expect(teams.length).toEqual(351);
            expect(firstTeam.name).toEqual('Louisville');
            expect(lastTeam.name).toEqual('Southern Utah');
            done();
        });
    });
});