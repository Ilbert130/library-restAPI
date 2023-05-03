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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    let idResult = {
        id: ''
    };
    if (!token) {
        return res.status(401).json({
            msg: 'It does not have any token in the request'
        });
    }
    try {
        let resul = jsonwebtoken_1.default.verify(token, 'SECRETORPRIVATEKEY=Esto03sMyPub1cK3y23@913@155DE');
        console.log(resul);
        const user = yield user_1.default.findOne({ _id: idResult.id });
        if (!user || !user.state) {
            return res.status(401).json({
                msg: 'Token is not valid'
            });
        }
        req.body.user = {
            id: user.id,
            role: user.role
        };
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
});
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map