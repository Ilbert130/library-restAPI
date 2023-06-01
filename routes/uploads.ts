import { Router } from 'express';
import { validatorUploadGet, validatorUploadPost, validatorUploadPut } from '../helpers/validators-upload';
import { createImage, imageGet, updateImage } from '../controllers/uploads';


const router = Router();

//GET
router.get('/:collection/:id', validatorUploadGet, imageGet);

//POST
router.post('/:collection', validatorUploadPost, createImage)

//PUT
router.put('/:collection/:id', validatorUploadPut, updateImage);

export = router;