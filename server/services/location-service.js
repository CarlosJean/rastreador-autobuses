const {Client} = require("@googlemaps/google-maps-services-js");
var secrets = require('../global/secrets');

module.exports = {
    test:(origins = 0, destinations=0)=>{
        return JSON.stringify({origins:origins,destinations:destinations});
    } ,
    //Función para obtener el tiempo entre dos dstancias. 
      time: (origins = 0, destinations=0)=>{
        const client = new Client({});
        client
        .distancematrix({
          params: {
            origins: [origins],
            destinations: [destinations],
            key: secrets.googleApiKey,
          },
          timeout: 1000, // milliseconds
        })
        .then((r) => {
          let duration = r.data.rows[0].elements[0].duration.text;
          return {status:200,message:duration};
        })
        .catch((e) => {
          console.error(e.response.data.error_message);
        });
    } 
};

;