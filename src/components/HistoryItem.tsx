import dateFormat from 'dateformat';
import { Dispatch, FC, SetStateAction } from 'react';
import { Badge, ListGroupItem, Stack } from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';
import { useViewCommandResults } from '../lib/utils';
import { HistoryItem } from '../store/slices/commandHistory';
import ManageHistoryButtonGroup from './ManageHistoryButtons';

interface HistoryItemProps extends HistoryItem {
  stopClickEvents?: boolean;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
  listGroupItem?: boolean;
  className?: string;
}

const HistoryItem: FC<HistoryItemProps> = (props) => {
  const viewCommandResults = useViewCommandResults(true);
  const {
    id,
    method,
    path,
    datetime,
    error,
    stopClickEvents,
    listGroupItem,
    className,
  } = props;
  const viewResults = () => viewCommandResults(id);

  const content = (
    <Stack direction="horizontal" className={'flex-grow-1 ' + className}>
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
          {dateFormat(new Date(datetime), 'HH:MM, yyyy-mm-dd')}
        </span>
        <ManageHistoryButtonGroup {...props} />
      </div>
    </Stack>
  );
  return listGroupItem ? (
    <ListGroupItem action onClick={stopClickEvents ? undefined : viewResults}>
      {content}
    </ListGroupItem>
  ) : (
    content
  );
};

export default HistoryItem;
