"use strict";
const express_1 = require("express");
const users_1 = require("../controllers/users");
const validators_user_1 = require("../helpers/validators-user");
const router = (0, express_1.Router)();
router.get('/', users_1.usersGet);
router.get('/:id', validators_user_1.validatorUserGet, users_1.userGet);
router.post('/', validators_user_1.validatorUserPost, users_1.userPost);
router.put('/:id', validators_user_1.validatorUserPut, users_1.userPut);
router.delete('/:id', validators_user_1.validatorUserDelete, users_1.userDelete);
module.exports = router;
//# sourceMappingURL=users.js.map