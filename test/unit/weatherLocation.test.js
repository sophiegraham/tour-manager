require('dotenv').config();
const weatherLocation = require('../../lib/util/weatherLocation');
describe('weather location', () => {
    it('calls no error when passed a good zip code', (done) => {
        const req = {
            body: { zip: 97205 }
        };

        const weather = { condition: 'good' };
        const location = { city: 'portland' };
        
        const api = () => {
            return Promise.resolve({ weather, location });
        };

        const middleware = weatherLocation(api);
        const next = err => {
            expect(err).toBeUndefined();
            expect(req.body).toEqual({ weather, location });
            done();
        };

        middleware(req, null, next);

    });

    it('calls an error when passed a bad zip code', (done) => {
        const req = {
            body: { zip: 'bad zip code' }
        };

        const error = { code: 404 };
        
        const api = () => {
            return Promise.reject(error);
        };

        const middleware = weatherLocation(api);
        const next = err => {
            expect(err).toEqual(error);
            done();
        };

        middleware(req, null, next);

    });
});

