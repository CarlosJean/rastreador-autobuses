const {Client} = require("@googlemaps/google-maps-services-js");
var secrets = require('../global/secrets');

module.exports = {
    test:(origins = 0, destinations=0)=>{
        return JSON.stringify({origins:origins,destinations:destinations});
    } ,
    //Función para obtener el tiempo entre dos dstancias. 
      time: (origins = 0, destinations=0)=>{
        //console.log({origins:origins,destinations:destinations});
        const client = new Client({});
        return client
        .distancematrix({
          params: {
            origins: [origins],
            destinations: [destinations],
            key: secrets.googleApiKey,
          },
          timeout: 1000, // milliseconds
        });
    } 
};

;