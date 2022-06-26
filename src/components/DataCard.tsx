import { startCase } from 'lodash';
import { EventHandler, FC, MouseEvent, ReactNode } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

type RenderListItem = (key: string, value: any) => void;

export interface DataCardProps {
  title: string | ReactNode;
  data: { [key: string]: any };
  renderListItem?: RenderListItem;
  buttonText: string;
  onButtonClick: EventHandler<MouseEvent>;
  ignoreDataKeys?: string[];
}

const defaultRenderListItem: RenderListItem = (key, value) => (
  <ListGroup.Item key={key}>
    <span className="fw-bold">{startCase(key)}</span>:{' '}
    <span>{value.toString()}</span>
  </ListGroup.Item>
);

const DataCard: FC<DataCardProps> = ({
  title,
  data,
  renderListItem = defaultRenderListItem,
  buttonText,
  onButtonClick,
  ignoreDataKeys = [],
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
