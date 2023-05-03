import { Router } from "express";
import { login } from "../controllers/auth";
import { validatorAuthPost } from "../helpers/validators-auth";



const router = Router();

//POST
router.post('/login', validatorAuthPost, login);

export = router;