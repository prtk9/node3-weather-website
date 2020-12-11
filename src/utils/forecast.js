const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=90028f389626b1576b5687d2cfdf41b6&query=' + latitude + ',' + longitude + '&units=f';
    request({ url , json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect weather service!')
        } else if(body.error) {
            callback('Unable to find location!')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.') 
        }
    })
}

module.exports = forecast
