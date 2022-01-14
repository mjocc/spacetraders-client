import 'bootswatch/dist/cyborg/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import AuthenticationModal from '../components/AuthenticationModal';
import CommandBar from '../components/CommandBar';
import Navbar from '../components/Navbar';
import store from '../store/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <AuthenticationModal />
      <Component {...pageProps} />
      <CommandBar />
    </Provider>
  );
}

export default App;
