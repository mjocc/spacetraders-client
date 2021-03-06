import { startCase } from 'lodash';
import { EventHandler, FC, MouseEvent, ReactNode } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

export interface DataCardProps {
  title: string | ReactNode;
  data: { [key: string]: any };
  buttonText: string;
  onButtonClick: EventHandler<MouseEvent>;
  ignoreDataKeys?: string[];
  highlight?: string;
}

const DataCard: FC<DataCardProps> = ({
  title,
  data,
  buttonText,
  onButtonClick,
  ignoreDataKeys = [],
  highlight,
}) => {
  return (
    <Card className="shadow-lg">
      <Card.Header>
        <Card.Title className="mb-0">
          {typeof title === 'string' ? startCase(title.toLowerCase()) : title}
        </Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        {Object.entries(data).map(
          ([key, value]) =>
            !ignoreDataKeys.includes(key) &&
            (Array.isArray(value) ? (
              value.length > 0 && (
                <ListGroup.Item active={highlight === key} key={key}>
                  <span className="fw-bold">{startCase(key)}</span>:
                  <ul className="mb-0">
                    {value.map((bullet) => (
                      <li key={bullet}>{startCase(bullet.toLowerCase())}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
              )
            ) : (
              <ListGroup.Item active={highlight === key} key={key}>
                <span className="fw-bold">{startCase(key)}</span>:{' '}
                <span>{value.toLocaleString()}</span>
              </ListGroup.Item>
            ))
        )}
      </ListGroup>
      <Card.Footer className="d-grid">
        <Button variant="outline-primary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default DataCard;
