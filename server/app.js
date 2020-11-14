
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const { Console } = require('console');
var locationService = require('./services/location-service');
const realtimeEngine = require('./services/realtime-engine');
const PORT = process.env.PORT || 5000;

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
	res.status(200).json(null);
});
app.get('/distance',(req,res)=>{
 origins = req.query.origins;
 destinations = req.query.destinations;

 console.info('Obteniendo tiempo de llegada.');

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

server.listen(PORT,()=>console.log(`Escuchando por el puerto ${PORT}! `));