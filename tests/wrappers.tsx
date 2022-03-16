/* eslint-disable react/display-name */
import type { AppWrapper, PageWrapper } from 'next-page-tester';
import { SWRConfig } from 'swr';

export const App: AppWrapper = (App) => (appProps) => <App {...appProps} />;
export const Page: PageWrapper = (Page) => (pageProps) => (
  <SWRConfig value={{ provider: () => new Map() }}>
    <Page {...pageProps} />     
  </SWRConfig>

);
