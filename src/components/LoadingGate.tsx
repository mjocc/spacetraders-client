import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { FC, ReactNode } from 'react';
import { Alert } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';

interface LoadingGateProps {
  token: string | null;
  data?: any;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  children: (data: any) => ReactNode;
}

const LoadingGate: FC<LoadingGateProps> = ({
  token,
  data,
  error,
  isLoading,
  children,
}) => {
  if (token === null)
    return <Alert variant="warning">No authentication token found.</Alert>;
  if (error) return <Alert variant="danger">Something went wrong.</Alert>;
  if (isLoading) return <LoadingScreen />;

  return <>{children(data)}</>;
};

export default LoadingGate;
