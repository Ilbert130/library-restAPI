import {prop, getModelForClass } from "@typegoose/typegoose";


export class Role {

    @prop({required:true})
    public role: string;

    @prop({default:true})
    public state: boolean
}

const RoleModel = getModelForClass(Role);
export default RoleModel;