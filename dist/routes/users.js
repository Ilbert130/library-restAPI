"use strict";
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (req, res) => { res.json({ msg: 'get' }); });
router.get('/:id', (req, res) => { res.json({ msg: 'get' }); });
router.post('/', (req, res) => { res.json({ msg: 'post' }); });
router.put('/:id', (req, res) => { res.json({ msg: 'put' }); });
router.delete('/:id', (req, res) => { res.json({ msg: 'delete' }); });
module.exports = router;
//# sourceMappingURL=users.js.map