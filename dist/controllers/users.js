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
exports.userPost = exports.userGet = exports.usersGet = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { state: true };
        const [total, users] = yield Promise.all([
            user_1.default.countDocuments(query),
            user_1.default.find(query)
                .skip(Number(since))
                .limit(Number(limit))
        ]);
        res.json({
            total,
            users
        });
    }
    catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
});
exports.usersGet = usersGet;
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield user_1.default.findById(id);
        res.json({
            usuario
        });
    }
    catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
});
exports.userGet = userGet;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const user = new user_1.default({ name, email, password, role });
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        yield user.save();
        res.json({
            user
        });
    }
    catch (error) {
        res.json({
            msg: 'Error',
            error
        });
    }
});
exports.userPost = userPost;
//# sourceMappingURL=users.js.map