import { Router, Request, Response, json} from "express";
import { bookReturnedStatus, createService, serviceDelete, submitAgainService } from "../controllers/services";



const router:Router = Router();

router.post('/submit', createService);

router.put('/submit/again/:id', submitAgainService);

router.put('/return/:id', bookReturnedStatus);

router.delete('/:id', serviceDelete);

export = router;