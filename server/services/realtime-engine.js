module.exports = (server,options)=>{
    const io = require('socket.io')(server, options);
    var pool  = [];

    io.on('connection',socket=>{
        console.log('client connected!');

        //Receive location from drivers.
        socket.on('location', (data) => {
            //console.log(data);
            /* let diferencia = Date.now() - 1604447459534/* data.timestamp/;
            let minuteDiference = Math.round(((diferencia % 86400000) % 3600000) / 60000); // minutes
            console.log('Minutos de diferencia' + minuteDiference); */
            //Emit location to passengers
            io.emit('location',data)
        });  

        //Client disconnect.
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}