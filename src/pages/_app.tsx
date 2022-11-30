import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../scss/main.scss';
import React from 'react';
import { appWithTranslation } from 'next-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
};

export default appWithTranslation(App);
