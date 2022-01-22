import dateFormat from 'dateformat';
import { FC } from 'react';
import { Badge, ListGroupItem, Stack } from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';
import { useViewCommandResults } from '../lib/utils';
import { HistoryItem } from '../store/slices/commandHistory';
import ManageHistoryButtonGroup from './ManageHistoryButtons';

interface HistoryItemProps extends HistoryItem {}

const HistoryItem: FC<HistoryItemProps> = (props) => {
  const viewCommandResults = useViewCommandResults(true);
  const { id, method, path, datetime, error } = props;
  const viewResults = () => viewCommandResults(id);

  return (
    <ListGroupItem key={id} action onClick={(e) => console.log(e)}>
      <Stack direction="horizontal">
        <div>
          {error ? (
            <AlertCircle className="text-danger me-3" />
          ) : (
            <CheckCircle className="text-success me-3" />
          )}
          <Badge bg="info" className="me-3">
            {method}
          </Badge>
          <span>{path}</span>
        </div>
        <div className="ms-auto">
          <span className="me-4">
            {dateFormat(new Date(datetime), 'H:MM "on" dddd d, mmm yy')}
          </span>
          <ManageHistoryButtonGroup {...props} />
        </div>
      </Stack>
    </ListGroupItem>
  );
};

export default HistoryItem;
