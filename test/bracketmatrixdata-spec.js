var request = require('request');

describe('bracketmatrixdata', function(abc) {
    it('should test the teams from bracket matrix teams were correctly scraped', function(done) {
        request('http://localhost:3000/bracketmatrixdata', function(error, response, body) {
            var teams = JSON.parse(body);
            var firstTeam = teams[0];
            expect(firstTeam.name).toEqual('Florida');
            //4 1 seeds
            expect(teams[0].bm_seed).toEqual(1);
            expect(teams[1].bm_seed).toEqual(1);
            expect(teams[2].bm_seed).toEqual(1);
            expect(teams[3].bm_seed).toEqual(1);

            //5 16 seeds
            expect(teams[63].bm_seed).toEqual(16);
            expect(teams[64].bm_seed).toEqual(16);
            expect(teams[65].bm_seed).toEqual(16);
            expect(teams[66].bm_seed).toEqual(16);
            expect(teams[67].bm_seed).toEqual(16);
            done();
        });
    });
});