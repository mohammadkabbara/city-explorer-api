  
const axios = require('axios');
const weather = {};


///////////////////////////weather part begain///////////////////

// server.get('/getWeather', getWeatherHandler);



weather. getWeatherHandler=function(req, res) {

    const weatherKey =process.env.WEATHER_API_KEY
    const city = req.query.cityName
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=${weatherKey}`;

/// get axios
    axios.get(URL).then(result => {
           ///cahed the data from API server 
            let weatherArray = result.data.data

            ///send method
            res.send(wetherForObject(weatherArray));
        })
        .catch(err => {
            res.send(err);
        })
    console.log('HELLO i PAASSED');
}

const wetherForObject = (weatherMab) => {


    //////// var to push the data inside it (description,date)
    
        const forCastObj = [];
    
        ////map throw the specific data we need 
        weatherMab.map(element => {
    
            const description = `Low of ${element.low_temp} ,High of ${element.max_temp} with ${element.weather.description}`;
    
            const date = element.datetime;
    
            forCastObj.push(new Forcast(description, date));
    
            // console.log(forCastObj);
        });
        return forCastObj;
    };
    
    //////////our const
    class Forcast {
        constructor(description, date) {
            this.date = date;
            this.description = description;
    
        }
    }
     




///////////////////////////weather part finish///////////////////

module.exports = weather;