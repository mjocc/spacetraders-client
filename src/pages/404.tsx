import { FC } from 'react';
import ErrorPage from '../components/ErrorPage';

const Error404: FC = () => (
  <ErrorPage errorCode={404} errorText="Page not found" />
);

export default Error404;
