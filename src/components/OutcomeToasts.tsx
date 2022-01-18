import { FC, useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getManageToast,
  selectBodyText,
  selectCloseDelay,
  selectMode
} from '../store/slices/outcomeToasts';

export type OutcomeToastModes = null | 'success' | 'error';

const OutcomeToasts: FC = () => {
  const containerProps = { style: { zIndex: 1060 }, className: 'p-3' };

  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const bodyText = useAppSelector(selectBodyText);
  const closeDelay = useAppSelector(selectCloseDelay);
  const { closeToast } = getManageToast(dispatch);

  useEffect(() => {
    if (mode !== null) {
      setTimeout(() => closeToast(), closeDelay);
    }
  }, [mode, closeToast, closeDelay]);

  return (
    <>
      <ToastContainer position="top-end" {...containerProps}>
        <Toast show={mode === 'success'} onClose={() => closeToast()}>
          <Toast.Header>
            <CheckCircle className="text-success me-2" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{bodyText.success}</Toast.Body>
        </Toast>
        <Toast show={mode === 'error'} onClose={() => closeToast()}>
          <Toast.Header>
            <AlertCircle className="text-danger me-2" />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{bodyText.error}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default OutcomeToasts;
