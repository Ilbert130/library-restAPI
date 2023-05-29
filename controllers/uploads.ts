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

    let pathImagen;
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
        pathImagen = path.join(__dirname, '../uploads', collection, model.image);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        }
    }

    pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
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
        if(fs.existsSync(pathImage)){
            fs.unlinkSync(pathImage)
        }
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