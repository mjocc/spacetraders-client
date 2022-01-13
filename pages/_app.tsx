import 'bootswatch/dist/cyborg/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import CommandBar from '../components/CommandBar';
import Navbar from '../components/Navbar';
import {
  initializeSpaceTradersSdk,
  spaceTraders,
} from '../lib/spacetradersSdkUtils';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeSpaceTradersSdk();
    // console.log(spaceTraders.getAccount());
  }, []);
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <CommandBar />
    </>
  );
}

export default App;
