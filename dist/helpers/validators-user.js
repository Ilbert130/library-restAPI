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
exports.validatorUserDelete = exports.validatorUserPut = exports.validatorUserPost = exports.validatorUserGet = void 0;
const validate_jwt_1 = require("../middlewares/validate-jwt");
const validate_role_1 = require("../middlewares/validate-role");
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const roles_1 = require("../utilities/roles");
const validate_fields_1 = require("../middlewares/validate-fields");
const role_1 = __importDefault(require("../models/role"));
const existEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield user_1.default.findOne({ email: email });
    if (emailExist) {
        throw new Error(`The email ${email} already exist`);
    }
});
const existUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_1.default.findById(id);
    const state = (existUser === null || existUser === void 0 ? void 0 : existUser.state) || false;
    if (!existUser) {
        throw new Error(`The id ${id} doesn't exist`);
    }
    if (!state) {
        throw new Error(`The id ${id} doesn't exist`);
    }
});
const isRoleValid = (role) => __awaiter(void 0, void 0, void 0, function* () {
    role.forEach((val, ind, arr) => __awaiter(void 0, void 0, void 0, function* () {
        const exist = yield role_1.default.findById(val);
        if (!exist) {
            throw new Error(`The role with id ${val} does'n exist`);
        }
    }));
});
exports.validatorUserGet = [
    (0, express_validator_1.check)('id', 'It is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(existUserById),
    validate_fields_1.validateFields
];
exports.validatorUserPost = [
    validate_jwt_1.validateJWT,
    (0, validate_role_1.roleVerification)(roles_1.Roles.Admin),
    (0, express_validator_1.check)('email', 'The email address is not valid').isEmail(),
    (0, express_validator_1.check)('email').custom(email => existEmail(email)),
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('role').custom(isRoleValid),
    (0, express_validator_1.check)('password', 'The password must have at least 6 characters').isLength({ min: 6 }),
    validate_fields_1.validateFields
];
exports.validatorUserPut = [
    validate_jwt_1.validateJWT,
    (0, validate_role_1.roleVerification)(roles_1.Roles.Admin),
    (0, express_validator_1.check)('id', 'It is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(existUserById),
    (0, express_validator_1.check)('role').custom(isRoleValid),
    validate_fields_1.validateFields
];
exports.validatorUserDelete = [
    validate_jwt_1.validateJWT,
    (0, validate_role_1.roleVerification)(roles_1.Roles.Admin),
    (0, express_validator_1.check)('id', 'It is not a valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(existUserById),
    validate_fields_1.validateFields
];
//# sourceMappingURL=validators-user.js.map