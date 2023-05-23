import doteenv from 'dotenv';
import Server from './models/server';
doteenv.config();

const server = new Server();

server.listen();
