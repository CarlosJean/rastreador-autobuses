
const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);

io.on('connection', socket => { /* ... */ 
  socket.on('location', (data) => {
    console.log(JSON.stringify(data));
  });
});

server.listen(3000);