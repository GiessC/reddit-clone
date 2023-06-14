import axios, { AxiosResponse } from "axios";
import { baseUrl } from "@/common/const/api";

export const getPosts = async (): Promise<AxiosResponse<PostApiDataType>> => {
    try {
        const posts: AxiosResponse<PostApiDataType> = await axios.get(
            `${baseUrl}/posts`
        );
        return posts;
    } catch (error) {
        throw error;
    }
};

export const createPost = async (
    formData: IPost
): Promise<AxiosResponse<PostApiDataType>> => {
    try {
        const post: Omit<IPost, '_id'> = {
            title: formData.title,
            body: formData.body,
            private: formData.private,
            creator: 'currentUser',
        };
        const savePost: AxiosResponse<PostApiDataType> = await axios.post(
            `${baseUrl}/posts`,
            post
        );
        return savePost
    } catch (error) {
        throw error;
    }
};

export const updatePost = async (
    post: IPost
): Promise<AxiosResponse<PostApiDataType>> => {
    try {
        const postUpdate: Pick<IPost, 'title' | 'body' | 'private'> = {
            title: post.title,
            body: post.body,
            private: post.private,
        };
        const updatedPost: AxiosResponse<PostApiDataType> = await axios.put(
            `${baseUrl}/posts/${post._id}`,
            postUpdate,
        );
        return updatedPost;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (
    _id: string
): Promise<AxiosResponse<PostApiDataType>> => {
    try {
        const deletedPost: AxiosResponse<PostApiDataType> = await axios.delete(
            `${baseUrl}/posts/${_id}`
        );
        return deletedPost;
    } catch (error) {
        throw error;
    }
};