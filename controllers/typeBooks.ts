import { Request, Response } from "express";
import TypeBookModel from "../models/typeBook";



//GET:
export const typeBooksGet = async(req:Request, res:Response) => {

    try {
        
        const {limit = 5, since = 0} = req.query;
        const query = {state:true};

        const [total, typeBooks] = await Promise.all([
            TypeBookModel.countDocuments(query),
            TypeBookModel.find(query)
                .skip(+since)
                .limit(+limit)
        ]);

        res.json({
            total,
            typeBooks
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//GET: By id
export const typeBookGet = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;
        const typeBook = await TypeBookModel.findById(id);

        res.json({
            typeBook
        });
        
    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}


//POST
export const typeBookPost = async(req:Request, res:Response) => {

    try {
        
        const {type} = req.body;
        const typeBookSave = new TypeBookModel({type});

        await typeBookSave.save();

        res.json({
            typeBook: typeBookSave
        });

    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//PUT
export const typeBookPut = async(req:Request, res:Response) => {

    try {
        
        const {id} = req.params;
        const {type} = req.body;

        const typeBookUpdate = await TypeBookModel.findByIdAndUpdate(id, {type}, {new:true});

        res.json({
            typeBook: typeBookUpdate
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}

//DELETE
export const typeBookDelete = async(req:Request, res:Response) => {

    try {
        
        const {id} = req.params;

        const typeBookDelete = await TypeBookModel.findByIdAndUpdate(id, {state:false}, {new:true});

        res.json({
            typeBook: typeBookDelete
        });

    } catch (error) {
        
        res.json({
            msg: 'Error',
            error
        });
    }
}
