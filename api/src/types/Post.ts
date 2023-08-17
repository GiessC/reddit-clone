import { Document } from 'mongoose';

interface IPostMeta {
    votes: number;
    saves: number;
}

export interface IPost extends Document {
    title: string;
    body: string;
    private: boolean;
    creator: string; // TODO: this will stay a string but must use the user _id instead of username
    createdAt: string;
    updatedAt: string;
    comments: string[]; // TODO: this should be another model
    meta: IPostMeta;
}