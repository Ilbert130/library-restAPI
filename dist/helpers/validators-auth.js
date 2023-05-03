"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorAuthPost = void 0;
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
exports.validatorAuthPost = [
    (0, express_validator_1.check)('email', 'The email is not valid').isEmail(),
    (0, express_validator_1.check)('password', 'The password is required').not().isEmpty(),
    validate_fields_1.validateFields
];
//# sourceMappingURL=validators-auth.js.map