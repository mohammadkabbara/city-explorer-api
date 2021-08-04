  
'use strict'

require('dotenv').config();
const express = require('express');
const server = express();
// const weatherData = require('./data/weather.json')
const cors = require('cors');
const PORT = process.env.PORT
const axios = require('axios')
const movies = require('./movies');
const weather = require('./weather');
server.use(cors())
//http://localhost:3000/test
server.get('/test', (req, res) => {
    let test = 'test'
    res.send(test)
});





//http://localhost:3000/getWeather?lat=31.95&lon=35.91&cityName=amman
server.get('/getWeather', weather.getWeatherHandler)



// http://localhost:3000/movies?city=Amman
server.get('/movies', movies)







    // const wetherForObject=(weatherObj)=>{
    //     const forCastObj = [];
    //     weatherObj.map(element=>{
    //         let description=`Low of ${element.low_temp} ,High of ${element.max_temp} with ${element.weather.description}`;

    //         let date=element.datetime

    //         forCastObj.push(new Forcast(description, date))
    //     })

    //     return forCastObj;

    // }


    // class Forcast {
    //     constructor(description, date) {
    //         this.date = date;
    //         this.description = description;
    
    //     }
    // }
    


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