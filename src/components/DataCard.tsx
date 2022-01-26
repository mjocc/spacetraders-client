import { EventHandler, FC, MouseEvent, ReactNode } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

interface DataCardProps {
  title: string | ReactNode;
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
    <Card className="shadow-lg">
      <Card.Header>
        <Card.Title className="mb-0">{title}</Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        {Object.entries(data).map(
          ([key, value]) =>
            !ignoreDataKeys.includes(key) && renderListItem(key, value)
        )}
      </ListGroup>
      {/* // TODO: fix issue with button centering on ships page */}
      <Card.Footer className="d-grid">
          <Button variant="outline-primary" onClick={onButtonClick}>
            {buttonText}
          </Button>
      </Card.Footer>
    </Card>
  );
};

export default DataCard;
