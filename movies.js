
const axios = require('axios');

////////////movies part begain////////////////////////////////




//http://localhost:3000/movies?city=Amman
// server.get('/movies', getMovieHandler);

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

module.exports = getMovieHandler;