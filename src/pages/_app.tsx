import '../styles/common/global.scss'
import type { AppProps } from 'next/app'
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { NextComponentType, NextPageContext } from 'next';
import { Session } from 'next-auth';

type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, {}> & {
    auth: boolean;
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      {
        Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )
      }
    </SessionProvider>
  )
}

const Auth: React.FC = function ({ children }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn() 
    }
  })

  if (session?.user) {
    return (<>
      {children}
    </>)
  }

  return <div>Loading...</div>
}

export default MyApp;