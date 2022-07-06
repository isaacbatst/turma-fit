import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, store } from '../application/frontend/store/index';
import { PersistGate } from 'redux-persist/integration/react'
import '@styles/reset.css';
import '@styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp;