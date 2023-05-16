import { Request, Response } from "express";



export const validateFile = (req:Request, res:Response, next:Function) => {

    //Validating if there is any file sended
    if(!req.files || Object.keys(req.files).length === 0 || !req.files.file) {

        return res.status(400).json({
            msg: 'There is not any file to upload'
        });
    }

    next();
}