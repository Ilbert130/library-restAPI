"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorAuthPost = exports.validatorAuthGet = void 0;
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
exports.validatorAuthGet = [
    validate_jwt_1.validateJWT
];
exports.validatorAuthPost = [
    (0, express_validator_1.check)('email', 'The email is not valid').isEmail(),
    (0, express_validator_1.check)('password', 'The password is required').not().isEmpty(),
    validate_fields_1.validateFields
];
//# sourceMappingURL=validators-auth.js.map