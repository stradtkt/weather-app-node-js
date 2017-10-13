const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
        .options({
            a: {
                demand: true,
                alias: 'address',
                describe: 'Address to fetch weather for',
                string: true
            }
        })
        .help()
        .alias('help', 'h')
        .argv;
        var encodedAddress = encodeURIComponent(argv.address);
        var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
        axios.get(geocodeUrl).then((response) => {
            if(response.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find that address');
            }
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var weatherUrl = `https://api.darksky.net/forecast/966aabdedae19c1a1b563cd08886c44e/${lat},${lng}`
            console.log(response.data.results[0].formatted_address);
            return axios.get(weatherUrl);
        }).then((response) => {
            var windGust = response.data.currently.windGust;
            var nearestStormDistance = response.data.currently.nearestStormDistance;
            var summary = response.data.currently.summary;
            var  humidity = response.data.currently.humidity;
            var temperature = response.data.currently.temperature;
            var apparentTemperature = response.data.currently.apparentTemperature;
            console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
            console.log(`The conditions outside are: ${summary}. The humidity is: humidity is ${humidity}`);
            console.log(`The is a windgust of ${windGust}`);
            console.log(`The nearest storm is ${nearestStormDistance}.`);
        }).catch((e) => {
            if(e.code === 'ENOTFOUND') {
                console.log('Unable to connect to api servers.');
            } else {
                console.log(e.message);
            }
        });
