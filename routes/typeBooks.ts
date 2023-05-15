import { Router } from "express";
import { validatorTypeBookDelete, validatorTypeBookGet, validatorTypeBookPost, validatorTypeBookPut } from "../helpers/validators-typeBook";


const router = Router();

router.get('/', );

router.get('/:id', validatorTypeBookGet);

router.post('/', validatorTypeBookPost);

router.put('/:id', validatorTypeBookPut);

router.delete('/:id', validatorTypeBookDelete);

export = router;