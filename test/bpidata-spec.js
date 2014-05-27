var request = require('request');

describe('bpidata', function(abc) {
    it('should test the teams from bpi teams were scraped', function(done) {
        request('http://localhost:3000/bpidata', function(error, response, body) {
            var teams = JSON.parse(body);
            var firstTeam = teams[0];
            var lastTeam = teams[350];
            expect(teams.length).toEqual(351);
            expect(firstTeam.name).toEqual('Arizona');
            expect(lastTeam.name).toEqual('Grambling St');
            done();
        });
    });
});