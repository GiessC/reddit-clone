import { IPost } from '../types/Post';
import { model, Schema } from 'mongoose';

const postSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        private: {
            type: Boolean,
            default: false,
        },
        creator: {
            type: String,
            required: true,
        },
        comments: {
            type: [String],
            default: [],
        },
        meta: {
            votes: {
                type: Number,
                default: 0
            },
            saves: {
                type: Number,
                default: 0
            },
        }
    },
    { timestamps: true }
);

export default model<IPost>('Post', postSchema);