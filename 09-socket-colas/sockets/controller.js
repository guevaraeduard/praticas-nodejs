const TiketControl = require('../models/tiket-control')

const tiketControl = new TiketControl()

const socketController = (socket) => {

    //Cuando un cliente se conecta
    socket.emit('ultimo-ticket', tiketControl.ultimo)
    socket.emit('estado-actual', tiketControl.ultimos4)

    socket.emit('tikets-pendientes', tiketControl.tikets.length)

    socket.on('siguiente-tiket', (payload, callback) => {

        const siguiente = tiketControl.siguiente()
        callback(siguiente)
        socket.broadcast.emit('tikets-pendientes', tiketControl.tikets.length)

        //Notificar que hay un nuevo ticket pendiente

    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = tiketControl.atenderTiket(escritorio)
            //Notificar cambio en los ultimos 4
        socket.broadcast.emit('estado-actual', tiketControl.ultimos4)
        socket.emit('tikets-pendientes', tiketControl.tikets.length)
        socket.broadcast.emit('tikets-pendientes', tiketControl.tikets.length)

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }


    })

}





module.exports = {
    socketController
}