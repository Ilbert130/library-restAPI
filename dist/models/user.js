"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }],
    state: {
        type: Boolean,
        default: true
    }
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.js.map