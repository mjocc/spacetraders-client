import { NextPage } from 'next';
import ErrorPage from '../components/ErrorPage';

const Error404: NextPage = () => (
  <ErrorPage errorCode={404} errorText="Page not found" />
);

export default Error404;
