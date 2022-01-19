import { FC } from "react";
import { useRouter } from "next/router";
import { AlertCircle, CheckCircle } from "react-feather";
import { viewCommandResults } from "../lib/utils";
import dateFormat from "dateformat";
import { Badge, ListGroupItem } from 'react-bootstrap';

const HistoryItem: FC<{
  id: string;
  method: "GET" | "POST";
  path: string;
  datetime: number;
  error: boolean;
}> = ({ id, method, path, datetime, error }) => {
  const router = useRouter();

  return (
    <ListGroupItem
      key={id}
      as="a"
      role="button"
      onClick={() => viewCommandResults(router, id)}
    >
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
    </ListGroupItem>
  );
};

export default HistoryItem;
