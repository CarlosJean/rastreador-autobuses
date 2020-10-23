module.exports = (server,options)=>{
    const io = require('socket.io')(server, options);
    var pool  = [];

    io.on('connection',socket=>{
        console.log('client connected!');

        //Receive location from drivers.
        socket.on('location', (data) => {
            console.log(data);
            //Emit location to passengers
            io.emit('location',data)
        });  

        //Client disconnect.
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}