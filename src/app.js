const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPaths = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPaths);
hbs.registerPartials(partialPaths);

// Setup static directory to serve
app.use(express.static(publicDir))

// serve up the routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Subhojit Debnath'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chaina Debnath'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Basu Debnath',
        message: "Type any Location in the search field, hit the button and see the magic!"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Subhojit Debnath",
        errorMessage: "Help article not found"
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast({ latitude, longitude, location }, (error, { weather_descriptions, temperature, feelslike, humidity, wind_speed, weather_icons } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                weather_description: `<strong>${weather_descriptions}</strong>. It is currently <strong>${temperature} degrees</strong> out. But it <strong>feels like</strong> ${feelslike} degress out`,
                location,
                address: req.query.address,
                weather_icons,
                humidity,
                wind_speed
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chaina Debnath',
        errorMessage: "Page not found"
    });
})

// start the server up
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})