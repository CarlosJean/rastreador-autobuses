const app = require('express')();
var http = require('http').createServer(app);
const port = 3000

/* Routing */
app.get('/', (req, res) => {
  res.send('Hello World')
})
/* Routing */

/* Socket io */
var io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
/* Socket io */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})