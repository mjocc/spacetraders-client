import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import DisplayCommandResults from '../../components/DisplayCommandResults';
import HistoryItem from '../../components/HistoryItem';
import LoadingScreen from '../../components/LoadingScreen';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectHistoryById } from '../../store/slices/commandHistory';

const ViewCommandResult: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const id: string = useMemo(
    () =>
      router.query.id
        ? typeof router.query.id !== 'string'
          ? router.query.id.join('')
          : router.query.id
        : '',
    [router.query]
  );
  const back = !!router.query.back;

  const historyItem = useAppSelector(selectHistoryById(id));

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
        {historyItem && <HistoryItem className="ms-1" {...historyItem} />}
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
