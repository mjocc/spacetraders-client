import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';

export type OutcomeToastModes = null | 'success' | 'error';

const OutcomeToasts: FC<{
  mode: OutcomeToastModes;
  setMode: Dispatch<SetStateAction<OutcomeToastModes>>;
}> = ({ mode, setMode }) => {
  useEffect(() => {
    if (mode !== null) {
      setTimeout(() => setMode(null), 3000);
    }
  }, [mode]);
  return (
    <>
      <ToastContainer
        className="p-3"
        position="top-end"
        style={{ zIndex: 1050 }}
      >
        <Toast show={mode === 'success'} onClose={() => setMode(null)}>
          <Toast.Header>
            <CheckCircle className="text-success me-2" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Command successfully executed.</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer className="p-3" position="top-end">
        <Toast show={mode === 'error'} onClose={() => setMode(null)}>
          <Toast.Header>
            <AlertCircle className="text-danger me-2" />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Something went wrong. Please try again.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default OutcomeToasts;
