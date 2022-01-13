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
import { AlertCircle, CheckCircle } from 'react-feather';

const CommandBar: FC = () => {
  const router = useRouter();
  const [method, setMethod] = useState<'GET' | 'POST'>('GET');
  const [path, setPath] = useState<string>('');
  const [body, setBody] = useState<string>('{ }');
  const [showMessage, setShowMessage] = useState<null | 'success' | 'error'>(
    null
  );
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const rawResponse = await fetch(`/api/run-command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method,
        path,
        body,
      }),
    });
    type ResponseType = { success: boolean; results: string | null };
    const response: ResponseType = (await rawResponse.json()) as ResponseType;
    setSubmitting(false);
    setShowMessage(response.success ? 'success' : 'error');
    setTimeout(() => setShowMessage(null), 2500);
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
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                      setMethod(event.target.value as 'GET' | 'POST')
                    }
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
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setPath(event.target.value)
                      }
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
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setBody(event.target.value)
                      }
                    />
                    <Form.Label>Request body (JSON)</Form.Label>
                  </Form.Group>
                </Col>
              )}
              <Col xs={1}>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    {submitting ? (
                      <Spinner size="sm" animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          show={showMessage === 'success'}
          onClose={() => setShowMessage(null)}
        >
          <Toast.Header>
            <CheckCircle className="text-success me-2" />
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Command successfully executed.</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer className="p-3" position="top-end">
        <Toast
          show={showMessage === 'error'}
          onClose={() => setShowMessage(null)}
        >
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

export default CommandBar;
