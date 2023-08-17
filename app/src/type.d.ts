interface IPostMeta {
    votes: number;
    saves: number;
}

interface IPost {
    _id: string;
    title: string;
    body: string;
    private: boolean;
    creator: string;
    comments?: string[];
    createdAt?: string;
    updatedAt?: string;
    meta?: IPostMeta;
}

interface PostProps {
    post: IPost;
}

type PostApiDataType = {
    message: string;
    status: string;
    posts: IPost[];
    post?: IPost;
};

interface IUserMeta {
    posts: number;
    comments: number;
    karma: number;
    saves: number;
}

interface IUser {
    _id: string;
    userId: string;
    username: string;
    createdAt?: string;
    updatedAt?: string;
    meta?: IUserMeta;
}

interface UserProps {
    user: IUser;
}

type UserApiDataType = {
    message: string;
    status: string;
    users: IUser[];
    user?: IUser;
};