import { FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {
  handleFormChange,
  makeApiCall,
  useViewCommandResults,
} from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addHistoryItem,
  createHistoryItem,
} from '../store/slices/commandHistory';
import { useToast } from '../store/slices/outcomeToasts';
import {
  initializeSpaceTraders,
  selectAuthenticated,
} from '../store/slices/spaceTraders';
import SubmitButton from './SubmitButton';

const AuthenticationModal: FC = () => {
  const viewCommandResults = useViewCommandResults();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [claimingToken, setClaimingToken] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [token, setToken] = useState<string>('');

  const dispatch = useAppDispatch();
  const { openToast } = useToast();
  const authenticated = useAppSelector(selectAuthenticated);

  const usernameField = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!authenticated && usernameField.current) {
      usernameField.current.focus();
    }
  }, [authenticated, usernameField]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const authenticate = (username: string, token: string) => {
      dispatch(initializeSpaceTraders({ username, token }));
      setUsername('');
      setToken('');
    };

    if (claimingToken) {
      const rawResponse = await makeApiCall('/api/claim-token', {
        username,
      });
      const results = await rawResponse.json();
      if (rawResponse.status === 409 && results.message) {
        openToast('error', results.message as string);
      } else if (results.token) {
        authenticate(username, results.token);
        openToast(
          'success',
          "Username claimed successfully. Authenticated automatically. See 'Query results' for details.",
          5000
        );
        const { id, historyItem } = createHistoryItem({
          method: 'GET',
          path: `/users/${username}/claim`,
          body: '',
          results,
        });
        dispatch(addHistoryItem(historyItem));
        viewCommandResults(id);
      }
    } else {
      const rawResponse = await makeApiCall('/api/verify-credentials', {
        username,
        token,
      });
      const results = await rawResponse.json();
      if (results.validCredentials) {
        authenticate(username, token);
      }
      results.validCredentials
        ? openToast('success', 'Authenticated successfully.')
        : openToast('error', 'Invalid authentication information.');
    }

    setSubmitting(false);
  };

  const handleClaimToken = () => {
    setClaimingToken((value) => !value);
    if (usernameField.current) {
      usernameField.current.focus();
    }
  };

  return (
    <>
      <Modal show={!authenticated}>
        <Modal.Header>
          <Modal.Title>
            {claimingToken
              ? 'Enter a username to claim it'
              : 'Enter authentication information'}
          </Modal.Title>
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
                ref={usernameField}
              />
            </Form.Group>
            <Form.Group controlId="authentication-modal-token-field">
              <Form.Label>Token</Form.Label>
              <Form.Control
                type="password"
                value={token}
                onChange={handleFormChange(setToken)}
                disabled={claimingToken}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              className="me-auto"
              onClick={handleClaimToken}
            >
              {claimingToken ? 'Enter details' : 'Claim a username'}
            </Button>
            <SubmitButton submitting={submitting}>
              {claimingToken ? 'Claim' : 'Submit'}
            </SubmitButton>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AuthenticationModal;
