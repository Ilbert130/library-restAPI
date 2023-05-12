import { Router } from 'express';
import { bookDelete, bookGet, bookPost, bookPut, booksGet } from '../controllers/books';
import { validatorBookDelete, validatorBookGet, validatorBookPost, validatorBookPut } from '../helpers/validator-book';


const router:Router = Router();

//GET
router.get('/', booksGet);

//GET: id
router.get('/:id', validatorBookGet, bookGet);

//POST
router.post('/', validatorBookPost, bookPost);

//PUT
router.put('/:id', validatorBookPut, bookPut);

//DELETE
router.delete('/:id', validatorBookDelete, bookDelete);

export = router;
