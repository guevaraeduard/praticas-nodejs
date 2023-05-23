import express, {Application} from 'express';
import userRouter from '../routes/usuarios'
import cors from 'cors'
import db from '../db/connection'

class Server{

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT  || '8000';

        this.dbConnection();

        this.middlewares();
        //Definir mis rutas
        this.routes()
    }

    async dbConnection(){
        try {
            
            await db.authenticate();
            console.log('Database Online');


        } catch (error) {
            throw new Error(error)
        }
    }

    middlewares(){
        //Configurar el cors
        this.app.use(cors())
        //lectura del body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, userRouter)
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }

}


export default Server;



