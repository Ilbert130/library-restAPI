import { Schema } from "mongoose";

interface User {
    name:string,
    email:string,
    img?:string,
    password:string,
    role: string[],
    state: boolean
}

const UserSchema = new Schema<User>({
    name: { 
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }],
    state: {
        type: Boolean,
        default: true
    }
});

export default UserSchema;