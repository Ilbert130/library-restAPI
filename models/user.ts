import {prop, getModelForClass, Ref } from "@typegoose/typegoose";
import {Role} from './role';

//Creating the model
class User {

    @prop({require:true})
    public name: string;

    @prop({require:true, unique:true})
    public email: string;

    @prop({require:true})
    public password: string

    @prop({ref:()=> Role, require:true})
    public role: Ref<Role>[];

    @prop({default:true})
    public state:boolean;
}

const UserModel = getModelForClass(User);
export default UserModel;



// const UserSchema = new Schema({
//     name: { 
//         type: String,
//         required: [true, 'The name is required']
//     },
//     email: {
//         type: String,
//         required: [true, 'The email is required'],
//         unique: true
//     },
//     password: {
//         type: String,
//         required: [true, 'The password is required']
//     },
//     role: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Role',
//         required: true
//     }],
//     state: {
//         type: Boolean,
//         default: true
//     }
// });