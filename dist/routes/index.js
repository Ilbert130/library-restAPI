"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesRoutes = exports.UserRoutes = exports.AuthRoutes = void 0;
const users_1 = __importDefault(require("./users"));
exports.UserRoutes = users_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.AuthRoutes = auth_1.default;
const roles_1 = __importDefault(require("./roles"));
exports.RolesRoutes = roles_1.default;
//# sourceMappingURL=index.js.map