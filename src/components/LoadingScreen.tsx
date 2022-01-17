import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingScreen: FC = () => {
  return (
    <div className="position-absolute h-100 w-100 top-0 start-0 d-flex justify-content-center align-items-center bg-black">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingScreen;
