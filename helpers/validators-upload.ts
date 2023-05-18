import { check } from "express-validator";
import { validateFile } from "../middlewares/validate-file";
import { validateFields } from "../middlewares/validate-fields";
import { Collection } from "../utilities/colecttion";


const allowcollections = (collection:string, collections:string[]) => {

    const included = collections.includes(collection);

    if(!included) {
        throw new Error(`The collection ${collection} isn't allow, ${collections}`);
    }

    return true;
} 


//PUT
export const validatorUploadPut = [
    validateFile,
    check('id', 'It is not a valid id').isMongoId(),
    check('collection').custom( c => allowcollections(c, [Collection.Book, Collection.User])),
    validateFields
];