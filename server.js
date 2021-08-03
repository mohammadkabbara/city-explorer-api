  
'use strict'

require('dotenv').config();
const express = require('express');
const server = express();
// const weatherData = require('./data/weather.json')
const cors = require('cors');
const PORT = process.env.PORT
const axios = require('axios')

server.use(cors())
//http://localhost:3000/test
server.get('/test', (req, res) => {
    let test = 'test'
    res.send(test)
})



server.get('/weather', weatherhandler)

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }
}

async function weatherhandler(req, res) {
    let key = process.env.WEATHER_API_KEY;
    let cityName = req.query.city_name;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}&days=4`

    try {
        let result = await axios.get(url)

        let forecastArr = result.data.data.map(item => {
            return new Forecast(item);
            // return newforecast;
        })

        res.send(forecastArr);
        console.log(forecastArr);
    }
    catch (errors) {

        res.send('error:NOT FOUND' + errors);
    }

} 

// https://api.themoviedb.org/3/movie/550?api_key=424dacb46f02f1dedfc49a55c08fdf67




//localhost:3001/weather?searchQuery=amman
// server.get('/weather', handleWeather);


// function handleWeather(request, response) {
//   let searchQuery = request.query.searchQuery;
//   const city = weather.find(item => item.city_name.toLowerCase() === searchQuery.toLowerCase());
//   if(city != undefined)
//   {
//     const weatherArray = city.data.map(day => new Forecast(day));
//     response.status(200).send(weatherArray);
//   }
//   else
//   {
//     errorHandler(response);
//   }
// }

// function errorHandler(response) {
//   response.status(500).send('something went wrong');
// }
  

// function Forecast(day) {
//   this.date = day.valid_date
//   this.description = day.weather.description
// }



server.get('*', (req, res) => {
  res.send('not found');
})

server.listen(PORT, () => console.log(`listening on ${PORT}`))