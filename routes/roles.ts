import { Router } from "express";
import { validatorRoleDelete, validatorRoleGet, validatorRolePost, validatorRolePut } from "../helpers/validators-role";


const router = Router();

router.get('/',);

router.get('/:id', validatorRoleGet);

router.post('/', validatorRolePost);

router.put('/:id', validatorRolePut);

router.delete('/:id', validatorRoleDelete);

export = router;