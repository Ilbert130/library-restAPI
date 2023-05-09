import {Router} from "express";
import { validatorAuthorDelete, validatorAuthorGet, validatorAuthorPost, validatorAuthorPut } from "../helpers/validator-author";



const router:Router = Router();


//GET
router.get('/', () => {msg:'getAll'});

//GET: id
router.get('/:id', validatorAuthorGet, () => {msg:'getById'});

//POST
router.post('/', validatorAuthorPost, () => {msg:'post'});

//PUT
router.put('/:id', validatorAuthorPut, () => {msg:'put'});

//DELETE
router.delete('/:id', validatorAuthorDelete, () => {msg:'delete'});

export = router;