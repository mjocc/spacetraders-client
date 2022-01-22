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
  const historyTotal = useAppSelector(selectHistoryTotal);
  const historyChunks = _chunk(history, 10);
  const [chunkIndex, setChunkIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>Command History | SpaceTraders Client</title>
        <meta name="description" content="History of commands issued" />
      </Head>

      <div className="d-block text-end mb-1">{historyTotal} item(s)</div>

      {historyTotal > 0 ? (
        <>
          {historyChunks[chunkIndex] && (
            <ListGroup style={{ height: '481px' }}>
              {historyChunks[chunkIndex].map((historyItem) => (
                <HistoryItem
                  key={historyItem.id}
                  {...historyItem}
                  stopClickEvents={modalOpen}
                  setModalOpen={setModalOpen}
                />
              ))}
            </ListGroup>
          )}
          {historyChunks.length > 1 && (
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
          )}
        </>
      ) : (
        <span>No history as of yet.</span>
      )}
    </>
  );
};

export default CommmandHistory;
