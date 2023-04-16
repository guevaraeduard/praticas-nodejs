const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
            //Conectar a la BD
        this.conectarDB()
            //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConection()
    }

    middlewares() {
        //Cors
        this.app.use(cors())
            //Lectura y parseo
        this.app.use(express.json())
            //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listem() {

        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;