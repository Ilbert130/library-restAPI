"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const routes_1 = require("../routes");
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            user: '/api/users',
            role: '/api/roles',
            author: '/api/authors',
            book: '/api/books'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '';
        this.connecteDB();
        this.middlewares();
        this.routes();
    }
    connecteDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, connection_1.default)();
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.auth, routes_1.AuthRoutes);
        this.app.use(this.apiPaths.user, routes_1.UserRoutes);
        this.app.use(this.apiPaths.role, routes_1.RolesRoutes);
        this.app.use(this.apiPaths.author, routes_1.AuthorRoutes);
        this.app.use(this.apiPaths.book, routes_1.BookRoutes);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig in this port', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map