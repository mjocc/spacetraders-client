import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEventHandler, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Spinner,
  Toast,
  ToastContainer,
  Tooltip,
} from 'react-bootstrap';
import { handleFormChange, makeApiCall } from '../lib/utils';
import SubmitButton from './SubmitButton';
import OutcomeToasts, { OutcomeToastModes } from './OutcomeToasts';

const CommandBar: FC = () => {
  const router = useRouter();
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [path, setPath] = useState<string>('');
  const [body, setBody] = useState<string>('{ }');
  const [showMessage, setShowMessage] = useState<OutcomeToastModes>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const rawResponse = await makeApiCall('/api/run-command', {
      method,
      path,
      body,
    });
    type ResponseType = { success: boolean; results: string | null };
    const response: ResponseType = (await rawResponse.json()) as ResponseType;
    setSubmitting(false);
    setShowMessage(response.success ? 'success' : 'error');
    if (response.success) {
      const results = JSON.stringify(response.results);
      setMethod('GET');
      setPath('');

      const url = '/view-command-results/?' + new URLSearchParams({ results });
      router.push(url);
    }
  };

  return (
    <>
      <Container className="position-absolute bottom-0 start-0 end-0" fluid>
        <div className="px-4 pt-3 pb-1 m-2 mb-4 rounded-3 border border-primary">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={2}>
                <Form.Group controlId="command-bar-method-field">
                  <Form.Select
                    aria-label="http method"
                    value={method}
                    onChange={handleFormChange(setMethod)}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </Form.Select>
                  <Form.Label>Method</Form.Label>
                </Form.Group>
              </Col>
              <Col xs={method === 'POST' ? 5 : 9}>
                <Form.Group controlId="command-bar-path-field">
                  <InputGroup>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 1000 }}
                      overlay={
                        <Tooltip>
                          <a
                            href="https://api.spacetraders.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            API docs
                          </a>
                        </Tooltip>
                      }
                    >
                      <InputGroup.Text id="api-url-prefix">
                        api.spacetraders.com
                      </InputGroup.Text>
                    </OverlayTrigger>
                    <Form.Control
                      type="text"
                      aria-describedby="api-url-prefix"
                      placeholder="e.g. /game/status"
                      value={path}
                      onChange={handleFormChange(setPath)}
                    />
                  </InputGroup>
                  <Form.Label>Path</Form.Label>
                </Form.Group>
              </Col>
              {method === 'POST' && (
                <Col xs={4}>
                  <Form.Group controlId="command-bar-body-field">
                    <Form.Control
                      type="text"
                      placeholder='e.g. { "hello": "world" }'
                      value={body}
                      onChange={handleFormChange(setBody)}
                    />
                    <Form.Label>Request body (JSON)</Form.Label>
                  </Form.Group>
                </Col>
              )}
              <Col xs={1}>
                <div className="d-grid">
                  <SubmitButton submitting={submitting} />
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <OutcomeToasts mode={showMessage} setMode={setShowMessage} />
    </>
  );
};

export default CommandBar;
