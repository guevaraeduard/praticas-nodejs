const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)

        this.paths = {

        }


        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();

        //Sockets
        this.sockets()
    }


    middlewares() {
        //Cors
        this.app.use(cors())
            //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {

    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listem() {

        this.server.listen(this.port, () => {
            console.log('Corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;