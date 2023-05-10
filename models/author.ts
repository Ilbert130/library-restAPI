import {prop, getModelForClass} from "@typegoose/typegoose";

//Creating the model
export class Author {

    @prop({require:true})
    public name: string;

    @prop({require:true})
    public lastName: string;

    @prop({default:true})
    public state:boolean;
}

const AuthorModel = getModelForClass(Author);
export default AuthorModel;