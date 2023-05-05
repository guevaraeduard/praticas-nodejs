const socketController = socket => {
    console.log('cliente conectado', socket.id)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    socket.on('enviar-mjs', (payload) => {
        //console.log(payload);
        socket.broadcast.emit('enviar-mjs', payload)
    })
}



module.exports = {
    socketController
}