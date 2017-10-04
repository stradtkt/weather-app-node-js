const request = require('request');
var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/966aabdedae19c1a1b563cd08886c44e/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                summary: body.currently.summary,
                humidity: body.currently.humidity,
                nearestStormDistance: body.currently.nearestStormDistance,
                windGust: body.currently.windGust
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
};
module.exports.getWeather = getWeather;
