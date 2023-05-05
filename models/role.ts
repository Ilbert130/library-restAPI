import {prop, getModelForClass } from "@typegoose/typegoose";


export class Role {

    @prop({required:true, unique:true})
    public role: string;

    @prop({default:true})
    public state: boolean
}

const RoleModel = getModelForClass(Role);
export default RoleModel;