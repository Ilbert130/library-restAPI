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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userPut = exports.userPost = exports.userGet = exports.usersGet = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { state: true };
        const [total, users] = yield Promise.all([
            user_1.default.countDocuments(query),
            user_1.default.find(query).populate('role', 'role')
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
        const user = yield user_1.default.findById(id).populate('role', 'role');
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
exports.userGet = userGet;
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const user = new user_1.default({ name, email, password, role });
        const salt = yield bcryptjs_1.default.genSalt();
        user.password = yield bcryptjs_1.default.hash(password, salt);
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
const userPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { _id, password } = _a, rest = __rest(_a, ["_id", "password"]);
        if (password) {
            const salt = yield bcryptjs_1.default.genSalt();
            rest.password = yield bcryptjs_1.default.hash(password, salt);
        }
        const user = yield user_1.default.findByIdAndUpdate(id, rest, { new: true });
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
exports.userPut = userPut;
const userDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.default.findByIdAndUpdate(id, { state: false }, { new: true });
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
exports.userDelete = userDelete;
//# sourceMappingURL=users.js.map