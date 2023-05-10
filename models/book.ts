import {prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Author } from "./author";


export class Book {

    @prop({required:true})
    public name: string;

    @prop({required:true})
    public description: string;

    @prop({required:true})
    public edition: string;

    @prop()
    public amount?: number;   

    @prop({ref:()=> Author, required:true})
    public author: Ref<Author>[];

    @prop({default:true})
    public state:boolean;
}

const BookModel = getModelForClass(Book);
export default BookModel;