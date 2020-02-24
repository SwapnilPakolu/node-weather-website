const request = require('request');
const util_secret = require('./util_secret');
var mapbox_access_token = util_secret.mapbox_access_token;
var darksky_secret = util_secret.darksky_secret;


const geocode = function(address,callback){
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapbox_access_token}&limit=1`;

  request({url,json:true},(error,response)=>{
    //console.log(response.statusCode);
    if(error)
    {
      // console.log(error);
      callback(error,undefined);
    }
    else if(response.statusCode===400)
    {
      // console.log('Bad Request');
      callback('Bad Request',undefined);
    }
    else if(response.body.features.length===0)
    { 
    //  console.log('no location found for mentioned place');
      callback('no location found for mentioned place',undefined);
    }
    else
    {const [longitude,latitude] = response.body.features[0].center; 
  
    const place_name = response.body.features[0].place_name;
    //console.log(`longitude and latitude of los angeles is and  ${longitude} and ${latitude} respectively`);
    callback(undefined,{longitude,latitude,place_name});
    }
  
  })

}

const forecast = (latitude,longitude,callback)=>{
  const url = `https://api.darksky.net/forecast/${darksky_secret}/${latitude},${longitude}`;
  request({url,json:true},(error,{body})=>{
    if(error)
    {
      callback(error,undefined);
      return;
    } 
    else if(body.code===400)
    {callback(body.error,undefined);}
    else
    {
    const {temperature,precipProbability } =  body.currently;

    callback(undefined,`It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`);
    }
    
  });
}

module.exports ={geocode,forecast};

