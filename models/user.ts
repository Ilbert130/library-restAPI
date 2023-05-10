import {prop, getModelForClass, Ref } from "@typegoose/typegoose";
import {Role} from './role';

//Creating the model
export class User {

    @prop({required:true})
    public name: string;

    @prop({required:true, unique:true})
    public email: string;

    @prop()
    public image?: string;

    @prop({required:true})
    public password: string

    @prop({ref:()=> Role, required:true})
    public role: Ref<Role>[];

    @prop({default:true})
    public state:boolean;
}


const UserModel = getModelForClass(User);
export default UserModel;