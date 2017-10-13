const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')
const argv = yargs
        .options({
            //setting the a command
            //shortened for address
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
                        //The weather items are displayed in the console
                        // based on the location the user sets, below will print with the right information about the area
                        console.log(`----------${weatherResults.time}`);
                        console.log(`----------Outside: ${weatherResults.hourly}`);
                        console.log(`----------Temperature: ${weatherResults.temperature}.\n----------Really feels like ${weatherResults.apparentTemperature}`);
                        console.log(`----------Condition: ${weatherResults.summary}.\n----------Humidity: ${weatherResults.humidity}`);
                        console.log(`----------Nearest Storm(mi): ${weatherResults.nearestStormDistance}\n----------Wind Gust: ${weatherResults.windGust} mph.`);
                    }
                });
            }
        });
