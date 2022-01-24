import { startCase } from 'lodash';
import { EventHandler, FC, MouseEvent } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

interface DataCardProps {
  title: string;
  data: { [key: string]: any };
  buttonText: string;
  onButtonClick: EventHandler<MouseEvent>;
  ignoreDataKeys?: string[];
}

const DataCard: FC<DataCardProps> = ({
  title,
  data,
  buttonText,
  onButtonClick,
  ignoreDataKeys = [],
}) => {
  return (
    <Card className="shadow-lg">
      <Card.Header>
        <Card.Title className="mb-0">{title}</Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        {Object.entries(data).map(
          ([property, value]) =>
            !ignoreDataKeys.includes(property) && (
              <ListGroup.Item key={property}>
                <span className="fw-bold">{startCase(property)}</span>:{' '}
                <span>{value.toString()}</span>
              </ListGroup.Item>
            )
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
