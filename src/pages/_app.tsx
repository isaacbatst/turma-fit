import { NextComponentType, NextPageContext } from 'next';
import { Session } from 'next-auth';
import { getSession, SessionProvider } from 'next-auth/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Provider } from 'react-redux';
import LoadingPage from '../components/common/LoadingPage';
import { store } from '../store/index';
import '../styles/common/global.scss';

type MyAppProps = AppProps & {
  pageProps: {
    session: Session,
    redirect?: boolean
  }
}
function MyApp({ Component, pageProps: { session, redirect, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const session = await getSession(appContext.ctx)
  appProps.pageProps.session = session;
  
  const { ctx: { res }, router } = appContext;

  const pathToRedirect = shouldRedirectTo(session, router.pathname);
 
  if(pathToRedirect && res){
    res.writeHead(307, { Location: pathToRedirect })
    res.end()

    return { ...appProps }
  }

  if(pathToRedirect) {
    router.push(pathToRedirect)
  }

  return { ...appProps }
}

function shouldRedirectTo(session: Session | null, pathname: string){
  if(!session){
    return '/'
  }

  if (!session.user.name && pathname !== '/fill-profile' ) {
    return '/fill-profile'
  }

  if (session.user.name && pathname === '/fill-profile') {
    return '/personal/advices'
  }
}

export default MyApp;