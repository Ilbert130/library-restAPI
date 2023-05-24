import { Router } from "express";
import { login, renewToken } from "../controllers/auth";
import { validatorAuthPost, validatorAuthGet } from '../helpers/validators-auth';



const router = Router();

//GET
router.get('/', validatorAuthGet, renewToken);

//POST
router.post('/login', validatorAuthPost, login);

export = router;