import { Request, Response } from "express";
import AuthorModel from "../models/author";




//GET
export const authorsGet = async(req:Request, res:Response) => {

    try {
        const {limit = 5, since = 0} = req.query;
        const query = {state:true};

        const [total, authors] = await Promise.all([
            AuthorModel.countDocuments(query),
            AuthorModel.find(query)
                .skip(+since)
                .limit(+limit)
        ]);

        res.json({
            total,
            authors
        });

    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//GET: id
export const authorGet = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        const author = await AuthorModel.findById(id);

        res.json({
            author
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//POST
export const authorPost = async(req:Request, res:Response) => {

    try {

        const {name, lastName} = req.body;
        const authorSave = new AuthorModel({name, lastName});

        await authorSave.save();

        res.json({
            author: authorSave
        });
        
    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//PUT
export const authorPut = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        const {name, lastName} = req.body;

        const authorUpdate = await AuthorModel.findByIdAndUpdate(id, {name, lastName}, {new:true});

        res.json({
            author: authorUpdate
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//DELETE
export const authorDelete = async(req:Request, res:Response) => {

    try {
        const {id} = req.params;
        const authorDelete = await AuthorModel.findByIdAndUpdate(id, {state:false}, {new:true});

        res.json({
            author: authorDelete
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}