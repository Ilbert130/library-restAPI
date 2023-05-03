import { validateJWT } from "../middlewares/validate-jwt";
import { roleVerification } from "../middlewares/validate-role";
import { check } from "express-validator";
import UserModel from "../models/user"
import { Roles } from "../utilities/roles";
import { validateFields } from "../middlewares/validate-fields";



//verifying if the email exist
const existEmail = async(email:string) => {
    const emailExist = await UserModel.findOne({email: email});
    if(emailExist){
        throw new Error(`The email ${email} already exist`);
    }
}


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
]