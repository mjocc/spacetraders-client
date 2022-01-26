import { chunk } from 'lodash';
import { NextPage } from 'next';
import { useState } from 'react';
import { Alert, ListGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import HistoryItem from '../../components/HistoryItem';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import {
  selectHistory,
  selectHistoryTotal,
} from '../../store/slices/commandHistory';

const CommmandHistory: NextPage = () => {
  const history = useAppSelector(selectHistory);
  const historyTotal = useAppSelector(selectHistoryTotal);
  const historyChunks = chunk(history, 10);
  const [chunkIndex, setChunkIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <StandardPageHead
        title="History"
        description="History of commands issued"
      />

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
                  listGroupItem
                />
              ))}
            </ListGroup>
          )}
          {historyChunks.length > 1 && (
            <ReactPaginate
              className="pagination d-flex justify-content-center align-items-center mt-3"
              pageCount={historyChunks.length}
              forcePage={chunkIndex}
              onPageChange={({ selected }) => setChunkIndex(selected)}
              previousLabel="&laquo;"
              nextLabel="&raquo;"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              disabledClassName="disabled"
              activeClassName="active"
            />
          )}
        </>
      ) : (
        <Alert variant="light">No history as of yet</Alert>
      )}
    </>
  );
};

export default CommmandHistory;
