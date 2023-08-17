import { IUser } from '../types/User';
import { model, Schema } from 'mongoose';

const userSchema: Schema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        meta: {
            posts: {
                type: Number,
                default: 0
            },
            comments: {
                type: Number,
                default: 0
            },
            karma: {
                type: Number,
                default: 0
            },
            saves: {
                type: Number,
                default: 0
            },
        },
    },
    { timestamps: true },
);

export default model<IUser>('User', userSchema);