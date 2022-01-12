import { ChangeEvent, FC, FormEventHandler, useRef, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Toast,
  ToastBody,
  ToastContainer,
} from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';

const CommandBar: FC = () => {
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [command, setCommand] = useState<string>('');
  const [showMessage, setShowMessage] = useState<null | 'success' | 'error'>(
    null
  );
  const commandBarInput = useRef(null);

  const showSuccessMessage = () => showMessage === 'success';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    // const rawResponse = await fetch(`/api/run-command/${method}/${command}`);
    // const response: { success: boolean } = (await rawResponse.json()) as {
    //   success: boolean;
    // };
    // setShowMessage(response.success ? 'success' : 'error');
    setShowMessage('error');
    setTimeout(() => setShowMessage(null), 3000);
  };

  return (
    <>
      <Container
        className="position-absolute pb-3 pt-2 bg-secondary bottom-0 start-0 end-0"
        fluid
      >
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={2}>
              <Form.Select
                aria-label="http method"
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setMethod(event.target.value as 'GET' | 'POST')
                }
                defaultValue={'GET'}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </Form.Select>
            </Col>
            <Col xs={8}>
              <Form.Control
                ref={commandBarInput}
                type="text"
                placeholder="Command"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCommand(event.target.value)
                }
              />
            </Col>
            <Col xs={2} className="d-grid">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <ToastContainer className="p-3" position="top-end">
        <Toast show={!!showMessage} onClose={() => setShowMessage(null)}>
          {showSuccessMessage() ? (
            <>
              <Toast.Header>
                <CheckCircle className="text-success me-2" />
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>Command successfully executed.</Toast.Body>
            </>
          ) : (
            <>
              <Toast.Header>
                <AlertCircle className="text-danger me-2" />
                <strong className="me-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>Something went wrong. Please try again.</Toast.Body>
            </>
          )}
        </Toast>
      </ToastContainer>
    </>
  );
};

export default CommandBar;
