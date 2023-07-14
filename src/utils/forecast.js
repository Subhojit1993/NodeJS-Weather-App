const request = require('postman-request');

const access_key = "7e4031fd989c6492a6384b97f03feaf2";

const forecast = ({ latitude, longitude }, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Forecast Error: Unable to connect to the weather service!', undefined);
        } else if (body.error) {
            callback(`Forecast Error: Unable to find the location`, undefined);
        } else {
            console.log("body", body);
            const { temperature, feelslike, weather_descriptions, wind_speed, humidity, weather_icons } = body.current;
            callback(undefined, {
                weather_descriptions,
                temperature,
                feelslike,
                wind_speed,
                humidity,
                weather_icons
            });
        }
    })
}

module.exports = forecast;