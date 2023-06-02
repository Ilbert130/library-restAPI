import { Router, Request, Response, json} from "express";
import { GetAllService, bookReturnedStatus, createService, serviceDelete, submitAgainService } from "../controllers/services";



const router:Router = Router();

router.get('/', GetAllService);

router.post('/submit', createService);

router.put('/submit/again/:id', submitAgainService);

router.put('/return/:id', bookReturnedStatus);

router.delete('/:id', serviceDelete);

export = router;