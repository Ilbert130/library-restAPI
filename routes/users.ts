import { Router } from "express";


const router:Router = Router();

//GET: All
router.get('/', (req, res) => {res.json({msg:'get'})});

//GET
router.get('/:id', (req, res) => {res.json({msg:'get'})});

//POST
router.post('/', (req, res) => {res.json({msg:'post'})});

//PUT
router.put('/:id', (req, res) => {res.json({msg:'put'})});

//DELETE
router.delete('/:id', (req, res) => {res.json({msg:'delete'})});

export = router;