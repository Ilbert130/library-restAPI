import { Router } from "express";
import { validatorTypeBookDelete, validatorTypeBookGet, validatorTypeBookPost, validatorTypeBookPut } from "../helpers/validators-typeBook";
import { typeBookDelete, typeBookGet, typeBookPost, typeBookPut, typeBooksGet } from "../controllers/typeBooks";


const router = Router();

router.get('/', typeBooksGet);

router.get('/:id', validatorTypeBookGet, typeBookGet);

router.post('/', validatorTypeBookPost, typeBookPost);

router.put('/:id', validatorTypeBookPut, typeBookPut);

router.delete('/:id', validatorTypeBookDelete, typeBookDelete);

export = router;