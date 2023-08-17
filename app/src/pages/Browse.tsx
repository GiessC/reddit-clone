import { useEffect, useState } from "react";
import { getPosts } from "@/api/PostAPI";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import Post from "@/common/components/post/Post";

const Browse = () => {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        getPosts()
            .then((response: AxiosResponse<PostApiDataType>) => {
                setPosts(response.data.posts);
            })
            .catch((error: Error) => {
                toast.error(error.message);
            });
    }, []);
    
    return (
        <div>
            <h1>Browse</h1>
            {
                posts.map((post: IPost) => (
                    <Post
                        key={post._id}
                        post={post}
                    />
                ))
            }
        </div>
    );
};

export default Browse;