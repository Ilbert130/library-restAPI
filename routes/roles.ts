import { Router } from "express";
import { validatorRoleDelete, validatorRoleGet, validatorRolePost, validatorRolePut } from "../helpers/validators-role";
import { roleDelete, roleGet, rolePost, rolePut, rolesGet } from "../controllers/roles";


const router = Router();

router.get('/', rolesGet);

router.get('/:id', validatorRoleGet, roleGet);

router.post('/', validatorRolePost, rolePost);

router.put('/:id', validatorRolePut, rolePut);

router.delete('/:id', validatorRoleDelete, roleDelete);

export = router;