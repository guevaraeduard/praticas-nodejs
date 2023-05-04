const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'

        }


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
            //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))

    }

    listem() {

        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto', this.port);
        })
    }

}

module.exports = Server;