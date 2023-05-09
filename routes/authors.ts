import {Router} from "express";
import { validatorAuthorDelete, validatorAuthorGet, validatorAuthorPost, validatorAuthorPut } from "../helpers/validator-author";
import { authorDelete, authorGet, authorPost, authorPut, authorsGet } from "../controllers/authors";



const router:Router = Router();


//GET
router.get('/', authorsGet);

//GET: id
router.get('/:id', validatorAuthorGet, authorGet);

//POST
router.post('/', validatorAuthorPost, authorPost);

//PUT
router.put('/:id', validatorAuthorPut, authorPut);

//DELETE
router.delete('/:id', validatorAuthorDelete, authorDelete);

export = router;