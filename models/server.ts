import express, {Application} from 'express';
import cors from 'cors';
import fileUpload, {  } from "express-fileupload";
import dbConnection from '../db/connection';
import { AuthRoutes, AuthorRoutes, BookRoutes, RolesRoutes, ServiceRoutes, TypeBookRoutes, UploadRoutes, UserRoutes } from '../routes';

class Server {

    private app:Application;
    private port:string;
    private apiPaths = {
        auth: '/api/auth',
        user: '/api/users',
        role: '/api/roles',
        author: '/api/authors',
        book: '/api/books',
        typeBook: '/api/typebook',
        upload: '/api/uploads',
        service: '/api/services'
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

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true  //To create folders if they don't exist
        }));
    }

    routes(){
        this.app.use(this.apiPaths.auth, AuthRoutes);
        this.app.use(this.apiPaths.user, UserRoutes);
        this.app.use(this.apiPaths.role, RolesRoutes);
        this.app.use(this.apiPaths.author, AuthorRoutes);
        this.app.use(this.apiPaths.book, BookRoutes);
        this.app.use(this.apiPaths.typeBook, TypeBookRoutes);
        this.app.use(this.apiPaths.upload, UploadRoutes);
        this.app.use(this.apiPaths.service, ServiceRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig in this port', this.port);
        })
    }
}

export default Server;