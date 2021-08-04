  
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
});


///////////////////////////wheather part begain///////////////////


//http://localhost:3000/getWeather?lat=31.95&lon=35.91&cityName=amman
server.get('/getWeather', getWeatherHandler);

 function getWeatherHandler(req, res) {

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

///////////////////////////wheather part finish///////////////////






////////////movies part begain////////////////////////////////



//http://localhost:3000/movies?city=Amman
server.get('/movies', getMovieHandler);

function getMovieHandler(req, res) {
    const city = req.query.city

    const movieKey=process.env.MOVIE_KEY
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}`

    axios .get(URLMovie).then(result => {
         

            let moviesArray = result.data.results

            res.send(moviesForObject(moviesArray));
        })
        .catch(err => {
            res.send(err);
        })
    
}


const moviesForObject = (moviesObj) => {

    const forMoviesObj = [];
    moviesObj.map(element => {

    const title = element.title
    const overview = element.overview
    const vote_average = element.vote_average
    const vote_count = element.vote_count
    const poster_path = process.env.img_url+element.poster_path
    const popularity = element.popularity
    const release_date = element.release_date

        forMoviesObj.push(new Movies(title,overview,vote_average,vote_count,poster_path,popularity,release_date));

        console.log(forMoviesObj);
    });
    return forMoviesObj;
}

///////our const
class Movies {
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date) {
    this.title = title
    this.overview = overview
    this.vote_average = vote_average
    this.vote_count = vote_count
    this.poster_path = poster_path
    this.popularity = popularity
    this.release_date = release_date
    }
}




////////////movies part finish////////////////////////////////







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