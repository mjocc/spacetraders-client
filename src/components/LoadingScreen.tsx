import { FC } from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingScreenProps {
  fullscreen?: boolean;
  compact?: boolean;
  className?: string;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ fullscreen, compact, className: customClassName = '' }) => {
  const className =
    (fullscreen ? 'bg-black position-absolute h-100 w-100 top-0 start-0' : '') +
    ' d-flex justify-content-center align-items-center ' + customClassName;
  const style = fullscreen || compact ? {} : { height: '16rem' };

  return (
    <div className={className} style={style}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingScreen;
