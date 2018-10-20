const { HttpError } = require('./errors');
const weatherApi = require('../../weather-service-example');

module.exports = (api = weatherApi) => {
    return (req, res, next) => {
        if(req.body.zip) {
            api(req.body.zip).then(results => {
                req.body = results;
                next();
            })
                .catch(next);
        }
        else {
            const httpError = new HttpError({
                code: 401,
                message: 'Forbidden'
            });
            next(httpError);
        }
    };
};
