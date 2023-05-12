import { Request, Response } from "express";
import BookModel from "../models/book";


//GET 
export const booksGet = async(req:Request, res:Response) => {

    try {
        const { limit = 5, since = 0} = req.query;
        const query = {state:true};

        const [total, books] = await Promise.all([
            BookModel.countDocuments(query),
            BookModel.find(query).populate('author')
                .skip(+since)
                .limit(+limit)
        ]);

        res.json({
            total,
            books
        });

    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//GET: By id
export const bookGet = async(req:Request, res:Response) => {
    
    try {

        const {id} = req.params;
        const book = await BookModel.findById(id).populate('author');

        res.json({
            book
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//POST
export const bookPost = async(req:Request, res:Response) => {

    try {

        const {name, description, edition, author } = req.body;
        const book = new BookModel({name, description, edition, author});

        await book.save();

        res.json({
            book
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//PUT
export const bookPut = async(req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const {name, description, edition, amount, author} = req.body;

        const book = await BookModel.findByIdAndUpdate(id, {name, description, edition, amount, author}, {new:true});

        res.json({
            book
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}

//DELETE
export const bookDelete = async(req:Request, res:Response) => {

    try {

        const {id} = req.params;

        const book = await BookModel.findByIdAndUpdate(id, {state:false}, {new:true});

        res.json({
            book
        });
        
    } catch (error) {

        res.json({
            msg: 'Error',
            error
        });
    }
}