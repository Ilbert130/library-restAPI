import { validateJWT } from "../middlewares/validate-jwt";
import { roleVerification } from "../middlewares/validate-role";
import { check } from "express-validator";
import UserModel from "../models/user"
import { Roles } from "../utilities/roles";
import { validateFields } from "../middlewares/validate-fields";
import RoleModel from "../models/role";



//verifying if the email exist
const existEmail = async(email:string) => {
    const emailExist = await UserModel.findOne({email: email});
    if(emailExist){
        throw new Error(`The email ${email} already exist`);
    }
}

//Verifying user by id
const existUserById = async(id:string) => {
    
    const existUser = await UserModel.findById(id);
    const state = existUser?.state || false;

    if(!existUser && !state){
        throw new Error(`The id ${id} doesn't exist`);
    }
}

//Verifying role of the user
const isRoleValid = async(role:string[]) => {

    role.forEach(async(val, ind, arr) => {
        const exist = await RoleModel.findById(val);

        if(!exist){
            throw new Error(`The role with id ${val} does'n exist`);
        }
    })
}

//GET
export const validatorUserGet = [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existUserById),
    validateFields
]

//POST
export const validatorUserPost = [
    validateJWT,
    roleVerification(Roles.Admin),
    check('email', 'The email address is not valid').isEmail(),
    check('email').custom(email => existEmail(email)),
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password must have at least 6 characters').isLength({min:6}),
    validateFields
];

//PUT
export const validatorUserPut = [
    validateJWT,
    roleVerification(Roles.Admin),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existUserById),
    check('role').custom(isRoleValid),
    validateFields
]

//DELETE
export const validatorUserDelete = [
    validateJWT,
    roleVerification(Roles.Admin),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom( existUserById),
    validateFields
]