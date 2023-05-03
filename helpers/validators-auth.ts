import { check } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields';



//POST: verifying the email and password
export const validatorAuthPost = [
    check('email', 'The email is not valid').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
]