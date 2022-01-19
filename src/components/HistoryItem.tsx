import { FC } from 'react';
import { useRouter } from 'next/router';
import { AlertCircle, CheckCircle } from 'react-feather';
import { runCommand, viewCommandResults } from '../lib/utils';
import dateFormat from 'dateformat';
import { Badge, ListGroupItem } from 'react-bootstrap';
import ManageHistoryButtonGroup from './ManageHistoryButtons';
import { HistoryItem } from '../store/slices/commandHistory';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectToken } from '../store/slices/spaceTraders';

interface HistoryItemProps extends HistoryItem {}

const HistoryItem: FC<HistoryItemProps> = ({
  id,
  method,
  path,
  datetime,
  error,
  body,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

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
        <ManageHistoryButtonGroup
          onResults={viewResults}
          onRerun={rerunCommand}
          onRemove={removeItem}
          small
        />
      </span>
    </ListGroupItem>
  );
};

export default HistoryItem;
