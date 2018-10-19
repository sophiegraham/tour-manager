const request = require('superagent');
const apiKey = process.env.WU_API_KEY;

if(!apiKey) {
    console.log('No API key present!');
    process.exit(1);
}

const getLocation = zip => `http://api.wunderground.com/api/${apiKey}/conditions/q/${zip}.json`;
const getWeather = zip => `http://api.wunderground.com/api/${apiKey}/wu/astronomy/hourly/q/${zip}.json`;

function processWeatherData(data) {
    return {
        temperature: data.hourly_forecast[0].temp.english,
        condition: data.hourly_forecast[0].condition,
    };
}

function processLocationData(data) {
    return {
        city: data.current_observation.display_location.city,
        state: data.current_observation.display_location.state,
    };
}

const get = url => request.get(url).then(res => res.body);

module.exports = function getLocationWeather(zip) {
    return Promise.all([
        get(getWeather(zip)).then(processWeatherData),
        get(getLocation(zip)).then(processLocationData)
    ]).then(([weather, location]) => {
        return { weather, location };
    });
};
