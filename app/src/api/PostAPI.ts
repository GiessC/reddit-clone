import axios, { AxiosResponse } from "axios";
import { baseUrl } from "@/common/const/api";
import { trackPromise } from 'react-promise-tracker';
import areas from "@/common/const/areas";

export const getPosts = async (): Promise<AxiosResponse<PostApiDataType>> => {
    try {
        const posts: AxiosResponse<PostApiDataType> = await trackPromise(
            axios.get(
                `${baseUrl}/posts`
            ), 
            areas.posts,
        );
        return posts;
    } catch (error) {
        throw error;
    }
};

export const getPostById = async (postId: string): Promise<AxiosResponse<PostApiDataType>> => {
    try {
        const post: AxiosResponse<PostApiDataType> = await trackPromise(
            axios.get(
                `${baseUrl}/posts/${postId}`,
            ),
            areas.posts,
        );
        return post;
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
            creator: 'currentUser', // TODO: replace with actual user _id, not username
        };
        const savePost: AxiosResponse<PostApiDataType> = await trackPromise(
            axios.post(
                `${baseUrl}/posts`,
                post
            ), 
            areas.posts
        );
        return savePost;
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
        const updatedPost: AxiosResponse<PostApiDataType> = await trackPromise(
            axios.put(
                `${baseUrl}/posts/${post._id}`,
                postUpdate,
            ), 
            areas.posts,
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
        const deletedPost: AxiosResponse<PostApiDataType> = await trackPromise(
            axios.delete(
                `${baseUrl}/posts/${_id}`
            ), 
            areas.posts,
        );
        return deletedPost;
    } catch (error) {
        throw error;
    }
};