import { Router } from "express";
import { userDelete, userGet, userPost, userPut, usersGet } from "../controllers/users";
import { validatorUserDelete, validatorUserGet, validatorUserPost, validatorUserPut } from "../helpers/validators-user";


const router:Router = Router();

//GET: All
router.get('/', usersGet);

//GET
router.get('/:id', validatorUserGet, userGet);

//POST
router.post('/',validatorUserPost, userPost);

//PUT
router.put('/:id', validatorUserPut, userPut);

//DELETE
router.delete('/:id', validatorUserDelete, userDelete);

export = router;