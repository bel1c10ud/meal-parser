import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import '../styles/nprogress-custom.css'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
