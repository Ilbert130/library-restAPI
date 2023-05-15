import {prop, getModelForClass } from "@typegoose/typegoose";


export class TypeBook {

    @prop({required:true, unique:true})
    public type: string;

    @prop({default:true})
    public state: boolean
}

const TypeBookModel = getModelForClass(TypeBook);
export default TypeBookModel;