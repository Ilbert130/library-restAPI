import express, {Application} from 'express';
import cors from 'cors';
import dbConnection from '../db/connection';
import { AuthRoutes, UserRoutes } from '../routes';

class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        auth: '/api/auth',
        user: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '';

        //Defining the connection
        this.connecteDB();

        //Defining the middlewares
        this.middlewares();

        //Defining the routes
        this.routes();
    }

    async connecteDB():Promise<void> {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Parsing body to JSON
        this.app.use(express.json());

        //Setting public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.auth, AuthRoutes);
        this.app.use(this.apiPaths.user, UserRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig in this port', this.port);
        })
    }
}

export default Server;