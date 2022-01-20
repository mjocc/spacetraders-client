import { FC, useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';
import { useAppSelector } from '../store/hooks';
import {
  OutcomeToastModes,
  selectOutcomeToasts,
  useToast,
} from '../store/slices/outcomeToasts';

// TODO: Make sure previous issue with many redux actions is not still present

interface OutcomeToastProps {
  mode: OutcomeToastModes;
  id: string;
  text: string;
}

const OutcomeToast: FC<OutcomeToastProps> = ({ mode, id, text }) => {
  const { closeToast } = useToast();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Toast show={show} onClose={() => closeToast(id)}>
      <Toast.Header>
        {mode === 'success' ? (
          <>
            <CheckCircle className="text-success me-2" />
            <strong className="me-auto">Success</strong>
          </>
        ) : (
          <>
            <AlertCircle className="text-danger me-2" />
            <strong className="me-auto">Error</strong>
          </>
        )}
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

const OutcomeToasts: FC = () => {
  const toasts = useAppSelector(selectOutcomeToasts);

  return (
    <ToastContainer position="top-end" style={{ zIndex: 1060 }} className="p-3">
      {toasts.map(({ mode, id, text }) => (
        <OutcomeToast key={id} mode={mode} id={id} text={text} />
      ))}
    </ToastContainer>
  );
};

export default OutcomeToasts;
