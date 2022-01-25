import { EventHandler, FC, MouseEvent } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

interface DataCardProps {
  title: string;
  data: { [key: string]: any };
  renderListItem: (key: string, value: any) => void;
  buttonText: string;
  onButtonClick: EventHandler<MouseEvent>;
  ignoreDataKeys?: string[];
}

const DataCard: FC<DataCardProps> = ({
  title,
  data,
  renderListItem,
  buttonText,
  onButtonClick,
  ignoreDataKeys = [],
}) => {
  return (
    <Card style={{ width: '32%' }} className="shadow-lg">
      <Card.Header>
        <Card.Title className="mb-0">{title}</Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        {Object.entries(data).map(
          ([key, value]) =>
            !ignoreDataKeys.includes(key) && renderListItem(key, value)
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
