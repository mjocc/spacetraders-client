import { FC } from 'react';
import { Button, Modal } from 'react-bootstrap';

const LogoutConfirmationModal: FC<{
  show: boolean;
  handleClose: () => void;
  onConfirmation: () => void;
}> = ({ show, handleClose, onConfirmation }) => (
  <>
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Logout confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to log out? You'll have to enter your username and
        token again.
      </Modal.Body>
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
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

export default LogoutConfirmationModal;