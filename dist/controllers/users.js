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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGet = exports.usersGet = void 0;
const models_1 = require("../models");
const usersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 5, since = 0 } = req.query;
        const query = { state: true };
        const [total, users] = yield Promise.all([
            models_1.User.countDocuments(query),
            models_1.User.find(query)
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
        const usuario = yield models_1.User.findById(id);
        res.json({
            usuario
        });
    }
    catch (error) {
    }
});
exports.userGet = userGet;
//# sourceMappingURL=users.js.map