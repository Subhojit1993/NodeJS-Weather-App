const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../../weather-app/utils/geocode');
const forecast = require('../../weather-app/utils/forecast');

const app = express();

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
        message: "This is some help text."
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
        forecast({ latitude, longitude, location }, (error, { weather_descriptions, temperature, feelslike } = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                weather_description: `${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degress out`,
                location: location,
                address: req.query.address
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
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})