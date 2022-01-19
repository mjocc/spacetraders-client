import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Badge, ListGroupItem } from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';
import { viewCommandResults } from '../lib/utils';
import { HistoryItem } from '../store/slices/commandHistory';
import ManageHistoryButtonGroup from './ManageHistoryButtons';

interface HistoryItemProps extends HistoryItem {}

const HistoryItem: FC<HistoryItemProps> = (props) => {
  const { id, method, path, datetime, error } = props;
  const router = useRouter();
  const viewResults = () => viewCommandResults(router, id);

  return (
    <ListGroupItem key={id} as="a" role="button" onClick={viewResults}>
      {error ? (
        <AlertCircle className="text-danger me-3" />
      ) : (
        <CheckCircle className="text-success me-3" />
      )}
      <Badge bg="info" className="me-3">
        {method}
      </Badge>
      <span>{path}</span>
      <span className="float-end">
        {dateFormat(new Date(datetime), 'H:MM "on" dddd d, mmm yy')}
      </span>
      <span className="float-end">
        <ManageHistoryButtonGroup {...props} small />
      </span>
    </ListGroupItem>
  );
};

export default HistoryItem;
