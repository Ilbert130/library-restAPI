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
exports.roleVerification = void 0;
const role_1 = __importDefault(require("../models/role"));
const roleVerification = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rolesHas = {
                hasRoles: false
            };
            if (!req.body.user) {
                return res.status(500).json({
                    msg: 'It is necesary to validate the token at first and then validate the role'
                });
            }
            const roleIds = [...req.body.user.role];
            for (let i = 0; i < roleIds.length; i++) {
                const id = roleIds[i].toString();
                const role = yield role_1.default.findById(id);
                rolesHas.hasRoles = roles.includes((role === null || role === void 0 ? void 0 : role.role) || '');
                if (rolesHas.hasRoles) {
                    break;
                }
            }
            if (!rolesHas.hasRoles) {
                return res.status(401).json({
                    msg: `This service require one of these roles ${roles}`
                });
            }
            next();
        }
        catch (error) {
            res.status(401).json({
                error
            });
        }
    });
};
exports.roleVerification = roleVerification;
//# sourceMappingURL=validate-role.js.map