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
}