import {prop, getModelForClass} from "@typegoose/typegoose";

//Creating the model
class author {

    @prop({require:true})
    public name: string;

    @prop({require:true})
    public lastName: string;

    @prop({default:true})
    public state:boolean;
}

const AuthorModel = getModelForClass(author);
export default AuthorModel;