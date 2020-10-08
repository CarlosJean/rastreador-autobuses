
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

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