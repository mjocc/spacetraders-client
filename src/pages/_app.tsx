import 'bootswatch/dist/cyborg/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AuthenticationModal from '../components/AuthenticationModal';
import CommandBar from '../components/CommandBar';
import Navbar from '../components/Navbar';
import store, { persistor } from '../store/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <AuthenticationModal />
        <Component {...pageProps} />
        <CommandBar />
      </PersistGate>
    </Provider>
  );
}

export default App;
