import { FC } from 'react';
import ErrorPage from '../components/ErrorPage';

const Error500: FC = () => (
  <ErrorPage errorCode={500} errorText="Server-side error occured" />
);

export default Error500;
