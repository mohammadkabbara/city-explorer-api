// 'use strict';
const  express =  require ('express');
const server = express();
const  weatherData =  require ('./data/weather.json');

const cors = require('cors');
server.use(cors()); 
require('dotenv').config();



const PORT =process.env.PORT


// http://localhost:3000/weather
server.get('/weather',(req,res) => {


    let wheatherUbdate=weatherData.find(item=>{
      
        return [item.city_name,item.lat,item.long];
    })





    // console.log(wheatherUbdate);
    res.send(wheatherUbdate);
  })





    server.listen(PORT,()=>{
      console.log(`I am listening on port ${PORT}`);
    })