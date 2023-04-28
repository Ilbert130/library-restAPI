import dotenv from 'dotenv';
import Server from './models/server';


//setting up dotenv
dotenv.config();

const server = new Server();
server.listen();