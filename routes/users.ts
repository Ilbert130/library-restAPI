import { Router } from "express";
import { userGet, usersGet } from "../controllers/users";


const router:Router = Router();

//GET: All
router.get('/', usersGet);

//GET
router.get('/:id', userGet);

//POST
router.post('/', (req, res) => {res.json({msg:'post'})});

//PUT
router.put('/:id', (req, res) => {res.json({msg:'put'})});

//DELETE
router.delete('/:id', (req, res) => {res.json({msg:'delete'})});

export = router;