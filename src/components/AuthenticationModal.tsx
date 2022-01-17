import { FC, FormEventHandler, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { handleFormChange, makeApiCall } from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getManageToast } from '../store/slices/outcomeToasts';
import {
  initializeSpaceTraders,
  selectAuthenticated,
} from '../store/slices/spaceTraders';
import OutcomeToasts from './OutcomeToasts';
import SubmitButton from './SubmitButton';

const AuthenticationModal: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const dispatch = useAppDispatch();
  const { openToast } = getManageToast(dispatch);
  const authenticated = useAppSelector(selectAuthenticated);
  useEffect(() => {
    if (!authenticated) {
      setShow(true);
    }
  }, [authenticated]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const rawResponse = await makeApiCall('/api/verify-credentials', {
      username,
      token,
    });
    const { validCredentials } = (await rawResponse.json()) as {
      validCredentials: boolean;
    };
    if (validCredentials) {
      setShow(false);
      dispatch(initializeSpaceTraders({ username, token }));
      setUsername('');
      setToken('');
    }
    openToast(validCredentials ? 'success' : 'error', {
      success: 'Authenticated successfully.',
      error: 'Invalid authentication information.',
    });
    setSubmitting(false);
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Enter authentication information</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="authentication-modal-username-field">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                value={username}
                onChange={handleFormChange(setUsername)}
              />
            </Form.Group>
            <Form.Group controlId="authentication-modal-token-field">
              <Form.Label>Token</Form.Label>
              <Form.Control
                type="password"
                value={token}
                onChange={handleFormChange(setToken)}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <SubmitButton submitting={submitting} />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AuthenticationModal;
