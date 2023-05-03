import { Router } from "express";
import { userGet, userPost, usersGet } from "../controllers/users";
import { validatorUserPost } from "../helpers/validators-user";


const router:Router = Router();

//GET: All
router.get('/', usersGet);

//GET
router.get('/:id', userGet);

//POST
router.post('/',validatorUserPost, userPost);

//PUT
router.put('/:id', (req, res) => {res.json({msg:'put'})});

//DELETE
router.delete('/:id', (req, res) => {res.json({msg:'delete'})});

export = router;