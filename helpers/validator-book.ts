import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";
import { roleVerification } from "../middlewares/validate-role";
import AuthorModel from "../models/author";
import BookModel from "../models/book";
import { Roles } from "../utilities/roles";
import { check } from 'express-validator';



//Verifying user by id
const existBookById = async(id:string) => {
    
    const existBook = await BookModel.findById(id);
    const state = existBook?.state || false;

    if(!existBook){
        throw new Error(`The id ${id} doesn't exist`);
    }

    if(!state){
        throw new Error(`The id ${id} doesn't exist`);
    }
}

//Verifying role of the user
const isAuthorValid = async(author:string[]) => {

    author.forEach(async(val, ind, arr) => {
        const exist = await AuthorModel.findById(val);

        if(!exist){
            throw new Error(`The role with id ${val} does'n exist`);
        }
    })
}


//GET
export const validatorBookGet = [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existBookById),
    validateFields
]

//POST
export const validatorBookPost = [
    validateJWT,
    roleVerification(Roles.Ventas),
    check('name', 'The name is required').not().isEmpty(),
    check('description', 'The description is required').not().isEmpty(),
    check('edition', 'The edition is required').not().isEmpty(),
    check('author').custom(isAuthorValid),
    validateFields
]

//PUT
export const validatorBookPut = [
    validateJWT,
    roleVerification(Roles.Ventas),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existBookById),
    check('author').custom(isAuthorValid),
    validateFields
]

//DELETE
export const validatorBookDelete = [
    validateJWT,
    roleVerification(Roles.Ventas),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existBookById),
    validateFields
]