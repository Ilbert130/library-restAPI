import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";
import { roleVerification } from "../middlewares/validate-role";
import RoleModel from "../models/role";
import { check } from 'express-validator';
import { Roles } from "../utilities/roles";


//verifying if the email exist
const existRole = async(role:string) => {
    const roleExist = await RoleModel.findOne({role: role});
    if(roleExist){
        throw new Error(`The role ${role} already exist`);
    }
}

//Verifying user by id
const existRoleById = async(id:string) => {
    
    const existRole = await RoleModel.findById(id);
    const state = existRole?.state || false;

    if(!existRole){
        throw new Error(`The id ${id} doesn't exist`);
    }

    if(!state){
        throw new Error(`The id ${id} doesn't exist`);
    }
}

//GET
export const validatorRoleGet = [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existRoleById),
    validateFields
];

//POST 
export const validatorRolePost = [
    validateJWT,
    roleVerification(Roles.Admin),
    check('role').custom(existRole),
    validateFields
];

//PUT
export const validatorRolePut = [
    validateJWT,
    roleVerification(Roles.Admin),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existRoleById),
    validateFields
];

//DELETE
export const validatorRoleDelete = [
    validateJWT,
    roleVerification(Roles.Admin),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existRoleById),
    validateFields
];