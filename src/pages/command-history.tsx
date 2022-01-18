import _chunk from 'lodash/chunk';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Badge, ListGroup, Pagination } from 'react-bootstrap';
import { AlertCircle, CheckCircle } from 'react-feather';
import { viewCommandResults } from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectHistory,
  selectHistoryTotal,
} from '../store/slices/commandHistory';
import dateFormat from 'dateformat';

interface CommandHistoryProps {}

const CommmandHistory: NextPage<CommandHistoryProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const historyChunks = _chunk(history, 10);
  const historyTotal = useAppSelector(selectHistoryTotal);

  const [chunkIndex, setChunkIndex] = useState<number>(0);

  return (
    <>
      <Head>
        <title>Command History | SpaceTraders Client</title>
        <meta name="description" content="History of commands issued" />
      </Head>
      <div className="d-block text-end mb-1">
        {historyTotal} items
      </div>
      {historyChunks[chunkIndex] && (
        <ListGroup>
          {historyChunks[chunkIndex].map((historyItem) => (
            <ListGroup.Item
              key={historyItem.id}
              as="a"
              role="button"
              onClick={() => viewCommandResults(router, historyItem.id)}
            >
              {historyItem.error ? (
                <AlertCircle className="text-danger me-3" />
              ) : (
                <CheckCircle className="text-success me-3" />
              )}
              <Badge bg="info" className="me-3">{historyItem.method}</Badge>
              <span >{historyItem.path}</span>
              <span className="float-end">
                {dateFormat(new Date(historyItem.datetime), 'H:MM "on" dddd d, mmm yy')}
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <Pagination className="d-flex justify-content-center align-items-center mt-3">
        {historyChunks.map((chunk, localChunkIndex) => (
          <Pagination.Item
            key={chunk[0].id}
            active={localChunkIndex === chunkIndex}
            onClick={() => {
              setChunkIndex(localChunkIndex);
            }}
          >
            {localChunkIndex + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default CommmandHistory;
