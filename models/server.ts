import express, {Application} from 'express';
import cors from 'cors';
import dbConnection from '../db/connection';

class Server {

    private app:Application;
    private port:string;
    private apiPaths = {

    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '';

        //Defining the connection
        this.connecteDB();

        //Defining the middlewares
        this.middlewares();

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

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig in this port', this.port);
        })
    }
}

export default Server;