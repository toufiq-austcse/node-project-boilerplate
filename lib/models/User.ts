import * as mongoose from 'mongoose';
import {Document, model} from 'mongoose';

export interface User {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserDocument extends User, Document {
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const UserModel = model<UserDocument>('User', userSchema);

