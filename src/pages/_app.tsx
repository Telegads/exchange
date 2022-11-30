import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../scss/main.scss';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#783afa" />
        <meta name="msapplication-TileColor" content="#783afa" />
        <meta name="theme-color" content="#783afa" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
};

export default appWithTranslation(App);
