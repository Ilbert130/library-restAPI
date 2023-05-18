import { Router } from 'express';
import { validatorUploadPut } from '../helpers/validators-upload';
import { updateImage } from '../controllers/uploads';


const router = Router();

//PUT
router.put('/:collection/:id', validatorUploadPut, updateImage);

export = router;