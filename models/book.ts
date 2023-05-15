import {prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Author } from "./author";
import { TypeBook } from "./typeBook";


export class Book {

    @prop({required:true})
    public name: string;

    @prop({required:true})
    public description: string;

    @prop({required:true})
    public edition: string;

    @prop({default:0})
    public amount?: number;  
    
    @prop()
    public image?: string;

    @prop({ref:()=> Author, required:true})
    public author: Ref<Author>[];

    @prop({ref:()=> TypeBook, required:true})
    public type: Ref<TypeBook>[];

    @prop({default:true})
    public state:boolean;
}

const BookModel = getModelForClass(Book);
export default BookModel;