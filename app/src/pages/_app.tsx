import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app';
import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
    const { user } = pageProps;

    return (
        <UserProvider user={user}>
            <Component {...pageProps} />
        </UserProvider>
    );
};

export default App;