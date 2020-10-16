module.exports = (server,options)=>{
    const io = require('socket.io')(server, options);
    
    io.on('connection',socket=>{
        console.log('client connected!');

        //Receive location
        socket.on('location', (data) => {
            console.log(data);
            //Emit location to clients
            io.emit('location',data)
        });  

        //Client disconnect.
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}