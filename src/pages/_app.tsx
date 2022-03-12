import '../styles/common/global.scss'
import type { AppProps } from 'next/app'
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useRouter } from 'next/router';
import LoadingPage from '../components/common/LoadingPage';

type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> & {
    auth: boolean;
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <RedirectHandler>
          <Component {...pageProps} />
        </RedirectHandler>
      </Provider>
    </SessionProvider>
  )
}

const RedirectHandler: React.FC = function ({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <LoadingPage />
  }

  if (router.pathname !== '/fill-profile' && !session.user.name) {
    router.push('/fill-profile');
    return <LoadingPage />
  }

  if (router.pathname === '/fill-profile' && session.user.name) {
    router.push('/personal/advices')
    return <LoadingPage />
  }

  return (<>
    {children}
  </>)
}

export default MyApp;