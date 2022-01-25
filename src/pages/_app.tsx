import 'bootswatch/dist/cyborg/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AuthenticationModal from '../components/AuthenticationModal';
import CommandBar from '../components/CommandBar';
import Layout from '../components/Layout';
import LoadingScreen from '../components/LoadingScreen';
import Navbar from '../components/Navbar';
import OutcomeToasts from '../components/OutcomeToasts';
import Sidebar from '../components/Sidebar';
import store, { persistor } from '../store/store';
import '../styles/main.scss';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/spacetraders.svg" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen fullscreen/>} persistor={persistor}>
          <Navbar />
          <AuthenticationModal />
          <OutcomeToasts />

          <Layout sidebar={<Sidebar />}>
            <Component {...pageProps} />
          </Layout>

          <CommandBar />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
