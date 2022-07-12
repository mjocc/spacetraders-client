import Link from 'next/link';
import { CSSProperties, FC, FormEventHandler, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Collapse,
  Container,
  Fade,
  Form,
  InputGroup,
  Row,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import { handleFormChange, MethodType, useRunCommand } from '../lib/utils';
import { useAppSelector } from '../store/hooks';
import { selectToken } from '../store/slices/auth';
import ApiDocsPopover from './ApiDocsPopover';
import SubmitButton from './SubmitButton';
import Tooltip from './Tooltip';

const CommandBar: FC = () => {
  const token = useAppSelector(selectToken);
  const runCommand = useRunCommand(token);
  const [openBar, setOpenBar] = useState<boolean>(false);
  const [openButton, setOpenButton] = useState<boolean>(!openBar);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [method, setMethod] = useState<MethodType>('GET');
  const [path, setPath] = useState<string>('');
  const [body, setBody] = useState<string>('{ }');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await runCommand({
      method,
      path,
      body,
      setRunning: setSubmitting,
      callback() {
        setMethod('GET');
        setPath('');
        setBody('{ }');
      },
    });
  };

  return (
    <>
      <Collapse in={openBar} onExited={() => setOpenButton(true)}>
        <Container
          style={{ zIndex: 1000, paddingLeft: '16.666667%' }}
          className="position-fixed bottom-0 start-0 end-0"
          fluid
        >
          <div className="position-relative">
            <div
              className="px-4 pt-3 pb-1 m-2 mb-4 rounded-3 border border-primary bg-light"
              style={{ '--bs-bg-opacity': 0.8 } as CSSProperties}
            >
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={2}>
                    <Form.Group controlId="command-bar-method-field">
                      <ToggleButtonGroup
                        type="radio"
                        name="http-method"
                        aria-label="http method"
                        value={method}
                        onChange={(value) => setMethod(value)}
                        className="d-flex"
                      >
                        <ToggleButton
                          variant="outline-primary"
                          id="get-button"
                          value="GET"
                        >
                          GET
                        </ToggleButton>
                        <ToggleButton
                          variant="outline-primary"
                          id="post-button"
                          value="POST"
                        >
                          POST
                        </ToggleButton>
                        <ToggleButton
                          variant="outline-primary"
                          id="put-button"
                          value="PUT"
                        >
                          PUT
                        </ToggleButton>
                      </ToggleButtonGroup>
                      <Form.Label>Method</Form.Label>
                    </Form.Group>
                  </Col>
                  <Col xs={method !== 'GET' ? 4 : 8}>
                    <Form.Group className="ps-4" controlId="command-bar-path-field">
                      <InputGroup>
                        <ApiDocsPopover>
                          <InputGroup.Text id="api-url-prefix">
                            api.spacetraders.io
                          </InputGroup.Text>
                        </ApiDocsPopover>
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
                  {method !== 'GET' && (
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
                  <Col xs={2}>
                    <Stack>
                      <ButtonGroup style={{ flex: 1 }}>
                        <SubmitButton
                          style={{ flex: 1 }}
                          submitting={submitting}
                        />
                        <Link href="/command/history" passHref>
                          <Button style={{ flex: 1 }} variant="secondary">
                            History
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </Stack>
                  </Col>
                </Row>
              </Form>
            </div>
            <div className="position-absolute end-0 bottom-0 d-flex justify-content-center align-items-center w-100">
              <Tooltip tooltipText="Hide command bar">
                <ChevronDown
                  role="button"
                  size={30}
                  onClick={() => {
                    setOpenBar(false);
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </Container>
      </Collapse>
      <Fade in={openButton} onExited={() => setOpenBar(true)}>
        <div className="position-fixed end-0 bottom-0 pb-4 pe-4">
          <Tooltip tooltipText="Show command bar">
            <Button
              variant="light"
              onClick={() => {
                setOpenButton(false);
              }}
            >
              <ChevronUp />
            </Button>
          </Tooltip>
        </div>
      </Fade>
    </>
  );
};

export default CommandBar;
