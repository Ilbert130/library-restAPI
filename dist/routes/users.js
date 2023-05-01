"use strict";
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/', users_1.usersGet);
router.get('/:id', users_1.userGet);
router.post('/', (req, res) => { res.json({ msg: 'post' }); });
router.put('/:id', (req, res) => { res.json({ msg: 'put' }); });
router.delete('/:id', (req, res) => { res.json({ msg: 'delete' }); });
module.exports = router;
//# sourceMappingURL=users.js.map