import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../application/frontend/store/index';
import '@styles/common/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;