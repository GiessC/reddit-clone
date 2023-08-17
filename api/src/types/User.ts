import { Document } from 'mongoose';

interface IUserMeta {
    posts: number;
    comments: number;
    karma: number;
    saves: number;
}

export interface IUser extends Document {
    userId: string;
    username: string;
    createdAt: string;
    meta: IUserMeta;
}