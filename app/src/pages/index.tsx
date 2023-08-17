import { userExists } from '@/api/UserAPI';
import RootLayout from '@/layouts/layout';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
// TODO: import { Cache } from 'swr';
import UsernameForm from '@/common/components/user/UsernameForm';
import { ToastContainer } from 'react-toastify';
import { CONTAINER_OPTIONS } from '@/common/const/errors';
import Button from '@/common/components/button/Button';

export default () => {
    const { user, error, isLoading } = useUser();
    const [firstSignIn, setFirstSignIn] = useState<boolean>(false);

    const handleUserSignIn = async () => {
        if (!user?.sub)
            return;
        const userInDatabase = await userExists(user.sub);
        if (!userInDatabase) {
            setFirstSignIn(true);
        }
    };
    
    useEffect(() => {
        handleUserSignIn();
    }, [user]);
    
    if (isLoading) 
        return <div>Loading...</div>;
    if (error) 
        return <div>{error.message}</div>;
    
    if (firstSignIn && user?.sub) {
        return (
            <RootLayout>
                <UsernameForm 
                    setFirstSignIn={setFirstSignIn}
                />
            </RootLayout>
        )
    }

    if (user) {        
        return (
            <RootLayout>
                <div>
                    Welcome {user.name}! Your unique ID is {user.sub}
                    <a href="/api/auth/logout">Logout</a>
                    <a href='/browse'>Browse</a>
                </div>
                <ToastContainer
                    {...CONTAINER_OPTIONS}
                />
            </RootLayout>
        );
    }
    // return <a href="/api/auth/login">Login</a>;
    return <Button href="/api/auth/login">Login</Button>;
};