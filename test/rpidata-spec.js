var request = require('request');

describe('alldata', function(abc) {
    it('should test the correct teams were scraped', function(done) {
        request('http://localhost:3000/rpidata', function(error, response, body) {
            var teams = JSON.parse(body);
            var firstTeam = teams[0];
            var lastTeam = teams[348];
            expect(teams.length).toEqual(349);
            expect(firstTeam.name).toEqual('Florida');
            expect(lastTeam.name).toEqual('Presbyterian');
            done();
        });
    });
});