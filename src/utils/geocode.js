const request = require('postman-request');

// user informations
const access_key = "6bd0b91831d2e42edb787b85f7103c6f";
const limit = 1;

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${access_key}&query=${address}&limit=${limit}`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Geocode Error: Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Geocode Error: Unable to find location. Try another search!', undefined);
        } else {
            const { data } = body;
            const latitude = data[0].latitude;
            const longitude = data[0].longitude;
            callback(undefined, {
                latitude,
                longitude,
                location: data[0].name
            });
        }
    })
}

module.exports = geocode;