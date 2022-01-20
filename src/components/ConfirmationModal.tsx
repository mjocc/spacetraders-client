import { FC, PropsWithChildren } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  buttonText: string;
  handleClose: () => void;
  onConfirmation: () => void;
}

const ConfirmationModal: FC<PropsWithChildren<ConfirmationModalProps>> = ({
  show,
  title,
  buttonText,
  handleClose,
  onConfirmation,
  children,
}) => (
  <>
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Go back
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleClose();
            onConfirmation();
          }}
        >
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

export default ConfirmationModal;
