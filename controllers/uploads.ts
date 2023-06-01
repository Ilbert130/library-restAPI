import { Request, Response } from "express";
import { Collection } from "../utilities/colecttion";
import UserModel from "../models/user";
import BookModel from "../models/book";
import path from 'path';
import fs from "fs";
import { uploadFile } from "../helpers/upload-files";


//GET
export const imageGet = async(req:Request, res:Response) => {

    const {id, collection} = req.params;

    let pathImage;
    let model;

    switch (collection) {
        case Collection.User:
            model = await UserModel.findById(id) || new UserModel({});

            if(!model){
                validateModel(model, id, res);
            }
            break;

        case Collection.Book:
            model = await BookModel.findById(id) || new UserModel({});
            if(!model){
                validateModel(model, id, res);
            }
            break;
        default:
            model = new UserModel({});
    }

    if(model.image){
        pathImage = path.join(__dirname, '../uploads', collection, model.image);
        return res.sendFile(pathImage);
        // if(fs.existsSync(pathImagen)){
        //     return res.sendFile(pathImagen);
        // }
    }

    pathImage = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImage);
}

//POST
export const createImage = async(req:Request, res:Response) => {

    const {collection} = req.params;
    const image:string = await uploadFile(req.files || '', undefined, collection) as string;
    res.json({image});
}

//PUT
export const updateImage = async(req:Request, res:Response) => {

    const {id, collection} = req.params;
    let model;
    let count:number = 0;

    switch (collection) {
        case Collection.User:
            model = await UserModel.findById(id) || new UserModel({});;
            count = 1;

            if(!model){
                validateModel(model, id, res);
            }
            break;

        case Collection.Book:
            model = await BookModel.findById(id) || new UserModel({});;
            count = 2;

            if(!model){
                validateModel(model, id, res);
            }
            break;
        default:
            model = new UserModel({});
    }

    if(model.image){
        const pathImage = path.join(__dirname, '../uploads', collection, model.image);
        return res.sendFile(pathImage);
        // if(fs.existsSync(pathImage)){
        //     return res.sendFile(pathImage);
        // }
    }

    model.image = await uploadFile(req.files || '', undefined, collection) as string;

    if(count === 1){
        await UserModel.findByIdAndUpdate(model._id, {image:model.image});
    }else{
        await BookModel.findByIdAndUpdate(model._id, {image:model.image});
    }
    
    res.json({
        model
    });
}


const validateModel = (model:any, id:string, res:Response) =>{

    return res.status(400).json({
        msg: `A ${model} with id ${id} doesn't exist`
    });
}