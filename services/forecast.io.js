const DarkSky = require('dark-sky');
const client = require('../services/redis-client');
const apiKey = process.env.API_KEY || 'b8c6f584e7b6ddd140a613ea3362fb8c';
const darkSky = new DarkSky(apiKey);

const request = async (latitude, longitude) => {
    try {
        if (Math.random() < 0.1) {
            throw new Error('How unfortunate! The API Request Failed');
        } else {
            return await darkSky.latitude(latitude).longitude(longitude).exclude('minutely,hourly,daily,alerts,flags').get();
        }
    } catch (e) {
        console.log("Error: " + e.message);
        client.hmset("api.errors", new Date().getTime().toString(), e.stack);
        return await request(latitude, longitude);
    }
};

const forecast = (callback) => {
    client.get('countries', async (err, data) => {
        if (err) {
            callback({});
        } else {
            let countries = JSON.parse(data);
            let result = [];
            for (let country of countries) {
                result.push(await request(country['latitude'], country['longitude']));
            }
            callback(result);
        }
    });
};

module.exports = forecast;