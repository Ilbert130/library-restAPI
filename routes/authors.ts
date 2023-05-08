import {Router} from "express";



const router:Router = Router();


//GET
router.get('/', () => {msg:'getAll'});

//GET: id
router.get('/:id', () => {msg:'getById'});

//POST
router.post('/', () => {msg:'post'});

//PUT
router.put('/:id', () => {msg:'put'});

//DELETE
router.delete('/:id', () => {msg:'delete'});

export = router;