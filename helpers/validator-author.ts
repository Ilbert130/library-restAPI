import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";
import { roleVerification } from "../middlewares/validate-role";
import RoleModel from "../models/role";
import { check } from 'express-validator';
import { Roles } from "../utilities/roles";
import AuthorModel from "../models/author";


//verifying if the email exist
const existAuthor = async(id:string) => {
    const authorExist = await AuthorModel.findById(id);
    if(authorExist){
        throw new Error(`The author with id ${id} already exist`);
    }
}

//Verifying user by id
const existAuthorById = async(id:string) => {
    
    const existAuthor = await AuthorModel.findById(id);
    const state = existAuthor?.state || false;

    if(!existAuthor && !state){
        throw new Error(`The id ${id} doesn't exist`);
    }
}

//GET
export const validatorAuthorGet = [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existAuthorById),
    validateFields
];

//POST 
export const validatorRolePost = [
    check('name', 'The name is required').not().isEmpty(),
    check('lastName', 'The lastName is required').not().isEmpty(),
    validateFields
];

//PUT
export const validatorRolePut = [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existAuthorById),
    validateFields
];

//DELETE
export const validatorRoleDelete = [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existAuthorById),
    validateFields
];