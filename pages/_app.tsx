import 'bootswatch/dist/cyborg/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import CommandBar from '../components/CommandBar';
import Navbar from '../components/Navbar';
import { initializeSpaceTradersSdk } from '../lib/spaceTradersSdkUtils';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initializeSpaceTradersSdk();
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
