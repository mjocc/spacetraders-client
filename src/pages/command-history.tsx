import _chunk from 'lodash/chunk';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { ListGroup, Pagination } from 'react-bootstrap';
import HistoryItem from '../components/HistoryItem';
import { useAppSelector } from '../store/hooks';
import {
  selectHistory,
  selectHistoryTotal,
} from '../store/slices/commandHistory';

const CommmandHistory: NextPage = () => {
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
      <div className="d-block text-end mb-1">{historyTotal} item(s)</div>
      {historyChunks[chunkIndex] && (
        <ListGroup>
          {historyChunks[chunkIndex].map((historyItem) => (
            <HistoryItem key={historyItem.id} {...historyItem} />
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
