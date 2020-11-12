
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
var locationService = require('./services/location-service');
const realtimeEngine = require('./services/realtime-engine');

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

/* Router */
app.get('/',(req,res)=>{
	res.status(200);
});
app.get('/distance',(req,res)=>{
 origins = req.query.origins;
 destinations = req.query.destinations;

 locationService.time(origins,destinations).then((r) => {
   let duration = r.data.rows[0].elements[0].duration.text;
   res.status(200).json({message:duration});
 })
 .catch((e) => {
   console.error(e.response.data.error_message);
 });

});
/* Router */

/* Realtime Engine */
realtimeEngine(server,options);
/* Realtime Engine */

server.listen(3000);