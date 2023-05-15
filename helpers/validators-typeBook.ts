import { check } from "express-validator";
import TypeBookModel from "../models/typeBook"
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";


//verifying if the type exist
const existTypeBook = async(type:string) => {
    const typeBookExist = await TypeBookModel.findOne({type: type});
    if(typeBookExist){
        throw new Error(`The type ${type} already exist`);
    }
}


//verifying if type exist by id
const existTypeBookById = async(id:string) => {

    const existType = await TypeBookModel.findById(id);
    const state = existType?.state || false;

    if(!existType){
        throw new Error(`The id ${id} doesn't exist`);
    }

    if(!state){
        throw new Error(`The id ${id} doesn't exist`);
    }
}

//GET
export const validatorTypeBookGet = [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existTypeBookById),
    validateFields
];

//POST
export const validatorTypeBookPost = [
    validateJWT,
    check('type').custom(existTypeBook),
    validateFields
];

//PUT
export const validatorTypeBookPut = [
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existTypeBookById),
    validateFields
];

//DELETE
export const validatorTypeBookDelete = [
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existTypeBookById),
    validateFields
];