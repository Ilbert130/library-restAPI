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
exports.login = exports.renewToken = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generate_jwt_1 = require("../helpers/generate-jwt");
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.user;
        const [user, token] = yield Promise.all([
            user_1.default.findById(id),
            (0, generate_jwt_1.generateJWT)(id)
        ]);
        res.json({
            user,
            token
        });
    }
    catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
});
exports.renewToken = renewToken;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password invalid - email'
            });
        }
        if (!user.state) {
            return res.status(400).json({
                msg: 'User / Password invalid - state: false'
            });
        }
        const [token, validPassword] = yield Promise.all([
            (0, generate_jwt_1.generateJWT)(user.id),
            bcryptjs_1.default.compare(password, user.password)
        ]);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password invalid - password'
            });
        }
        res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk with the admin'
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map