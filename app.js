const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')
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
        geocode.geocodeAddress(argv.address, (errorMessage, results) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(results.address);
                weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                    if(errorMessage) {
                        console.log(errorMessage);
                    } else {
                        console.log(`\nIt is currently: ${weatherResults.temperature}.\n It feels like ${weatherResults.apparentTemperature}\n`);
                        console.log(`The condition outside is: ${weatherResults.summary}.\n The humidity levels are: ${weatherResults.humidity}\n`);
                        console.log(`The nearest storm is ${weatherResults.nearestStormDistance}\nThere is a wind guest of about : ${weatherResults.windGust} mph.`);
                    }
                });
            }
        });
