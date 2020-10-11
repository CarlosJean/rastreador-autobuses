
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
var locationService = require('./services/location-service');

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

/* Router */
app.get('/distance',(req,res)=>{
 origins = req.query.origins;
 destinations = req.query.origins;
 console.log(locationService.test(origins,destinations));
});
/* Router */

/* Socket IO */
io.on('connection', socket => {
  console.log('Client connected!');

  //Receive location
  socket.on('location', (data) => {
    //Emit location to clients
    io.emit('location',data)
  });  
});
/* Socket IO */

server.listen(3000);