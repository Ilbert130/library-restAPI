import express, {Application} from 'express';
import cors from 'cors';
import dbConnection from '../db/connection';
import { AuthRoutes, AuthorRoutes, BookRoutes, RolesRoutes, UserRoutes } from '../routes';
import router from '../routes/books';

class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        auth: '/api/auth',
        user: '/api/users',
        role: '/api/roles',
        author: '/api/authors',
        book: '/api/books'
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
        this.app.use(this.apiPaths.role, RolesRoutes);
        this.app.use(this.apiPaths.author, AuthorRoutes);
        this.app.use(this.apiPaths.book, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig in this port', this.port);
        })
    }
}

export default Server;