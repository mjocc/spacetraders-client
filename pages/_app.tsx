import '../styles/globals.css';
import 'bootswatch/dist/cyborg/bootstrap.min.css';

import type { AppProps } from 'next/app';

import CommandBar from '../components/CommandBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <CommandBar />
    </>
  );
}

export default MyApp;
