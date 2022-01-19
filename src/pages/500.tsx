import { NextPage } from 'next';
import ErrorPage from '../components/ErrorPage';

const Error500: NextPage = () => (
  <ErrorPage errorCode={500} errorText="Server-side error occured" />
);

export default Error500;
