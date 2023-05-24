import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';



//GET
export const validatorAuthGet = [
    validateJWT
]

//POST: verifying the email and password
export const validatorAuthPost = [
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
]