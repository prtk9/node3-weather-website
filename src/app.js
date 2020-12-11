const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //by default the folder name is views, here it is customized to templates
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {name : 'Prateek'},
//         {name: 'pv'}
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Prateek Valecha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Prateek Valecha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Prateek Valecha'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error }) 
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error }) 
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            }) 
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorText: 'Help article not found',
        name: 'Prateek Valecha'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        title: '404',
        errorText: 'Page not found',
        name: 'Prateek'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
