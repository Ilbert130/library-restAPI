"use strict";
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validators_auth_1 = require("../helpers/validators-auth");
const router = (0, express_1.Router)();
router.get('/', validators_auth_1.validatorAuthGet, auth_1.renewToken);
router.post('/login', validators_auth_1.validatorAuthPost, auth_1.login);
module.exports = router;
//# sourceMappingURL=auth.js.map