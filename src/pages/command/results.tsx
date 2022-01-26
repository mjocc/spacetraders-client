import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import DisplayCommandResults from '../../components/DisplayCommandResults';
import LoadingScreen from '../../components/LoadingScreen';
import ManageHistoryButtonGroup from '../../components/ManageHistoryButtons';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectHistoryById } from '../../store/slices/commandHistory';

const ViewCommandResult: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string>('');
  const [back, setBack] = useState<boolean>(false);
  const historyItem = useAppSelector(selectHistoryById(id));

  useEffect(() => {
    if (router.query.id) {
      let id;
      if (typeof router.query.id !== 'string') {
        id = router.query.id.join('');
      } else {
        id = router.query.id;
      }
      setId(id);
    }
    if (router.query.back) {
      setBack(true);
    }
  }, [router.query]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, [setLoading]);

  return (
    <>
      <StandardPageHead
        title="Results"
        description="Results from executed command"
      />
      <Stack direction="horizontal" className="mb-2" gap={2}>
        {back && (
          <Link href="/command/history" passHref>
            <ArrowLeft role="button" size={28} />
          </Link>
        )}
        <h1 className="h5 mb-0">Query results</h1>
        {historyItem && (
          <ManageHistoryButtonGroup className="ms-auto" {...historyItem} />
        )}
      </Stack>

      {router.query ? (
        <DisplayCommandResults
          loading={loading}
          id={id}
          historyItem={historyItem}
        />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default ViewCommandResult;
