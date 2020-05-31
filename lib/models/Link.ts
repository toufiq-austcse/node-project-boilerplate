import * as mongoose from 'mongoose';
import {Document, model} from 'mongoose';

export interface Link {
    url?: string;
    unique_id?: string;
    user_id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface LinkDocument extends Link, Document {
}

const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url: {
        required: true,
        type: String,
    },
    unique_id: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

export const LinkModel = model<LinkDocument>('Link', linkSchema);

