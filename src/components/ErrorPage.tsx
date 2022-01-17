import { FC } from 'react';

const ErrorPage: FC<{ errorCode: number; errorText: string }> = ({
  errorCode,
  errorText,
}) => (
  <div style={{ paddingTop: '58px', paddingBottom: '122px' }} className="position-absolute d-flex top-0 start-0 w-100 h-100 justify-content-center align-items-center h-100 w-100">
    <div className="border rounded-3 p-4 d-flex flex-column justify-content-center align-items-center">
      <h1 className="fw-bold">{errorCode}</h1>
      <h4>{errorText}</h4>
    </div>
  </div>
);

export default ErrorPage;
