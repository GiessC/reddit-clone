import { getUserById } from '@/api/UserAPI';
import areas from '@/common/const/areas';
import { API_ERROR, handleApiError, postError } from '@/common/const/errors';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { toast } from 'react-toastify';
import Error404 from '../errors/404';
import { DateTime } from 'luxon';

const UserPage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const [user, setUser] = React.useState<IUser | undefined | null>(null);
    const { promiseInProgress: loadingUser } = usePromiseTracker({ area: areas.users });

    // TODO: Get posts from user
    // TODO: Get comments from user
    // TODO: Get user's karma

    const getUser = async () => {
        try {
            const user: AxiosResponse<UserApiDataType> = await getUserById(id);
            console.debug(user.data.user);
            setUser(user.data.user);
        } catch (error) {
            const apiError = handleApiError(error);
            console.debug(apiError);
            toast.error(apiError.message);
        }
    };

    useEffect(() => {
        if (!id)
            return;
        getUser();
    }, [id]);
    
    return (
        loadingUser
        ?
        <div>Loading...</div>
        :
        user
        ?
        <div>
            <h3>{user.username}</h3>
            <p>Joined on {DateTime.fromISO(user.createdAt!).toLocaleString(DateTime.DATETIME_FULL)}</p>
            <p>{user.meta?.karma} karma</p>
            <p>{user.meta?.posts} posts</p>
            <p>{user.meta?.comments} comments</p>
        </div>
        :
        <Error404 
            type='User'
        />
    );
};

export default UserPage;