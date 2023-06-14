import { Response, Request } from "express";
import { IPost } from "../../types/Post";
import Post from "../../models/Post";

const getPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const posts: IPost[] = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        throw error;
    }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IPost, keyof IPost>;

        const post: IPost = new Post({
            title: body.title,
            body: body.body,
            private: body.private,
            creator: body.creator,
        });

        const newPost: IPost = await post.save();
        const allPosts: IPost[] = await Post.find();

        res
            .status(201)
            .json({ message: "Post created", post: newPost, posts: allPosts });
    } catch (error) {
        throw error;
    }
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            params: { id },
            body,
        } = req;
        const updatePost: IPost | null = await Post.findByIdAndUpdate(
            { _id: id },
            body
        );
        const allPosts: IPost[] = await Post.find();
        res.status(200).json({
            message: 'Post updated',
            post: updatePost,
            posts: allPosts,
        });
    } catch (error) {
        throw error;
    }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedPost: IPost | null = await Post.findByIdAndRemove(
            req.params.id,
        );
        const allPosts: IPost[] = await Post.find();
        res.status(200).json({
            message: 'Post deleted',
            post: deletedPost,
            posts: allPosts,
        });
    } catch (error) {
        throw error;
    }
};

export { getPosts, createPost, updatePost, deletePost };