// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3ee89f1926c7fc5c13dfd8795ceb8511&query=" + encodeURIComponent(lat) + "," + encodeURIComponent(long) + "&units=m"
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to fetch forecast data, check network", undefined)

        } else if (body.error) {
            console.log("Unable to fetch weather data", undefined)

        } else {
            
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. There is a " + body.current.precip + "% chance of rain")
        }
    })
}

module.exports = forecast