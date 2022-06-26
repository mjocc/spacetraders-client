import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';

interface LoadingGateProps<T> {
  token: string | null;
  data?: T;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  children: (data: T) => ReactNode;
}

const LoadingGate = <T,>({
  token,
  data,
  error,
  isLoading,
  children,
}: LoadingGateProps<T>): JSX.Element => {
  if (token === null)
    return <Alert variant="warning">No authentication token found.</Alert>;
  if (error) return <Alert variant="danger">Something went wrong.</Alert>;
  if (isLoading) return <LoadingScreen />;

  return <>{children(data as T)}</>;
};

export default LoadingGate;
