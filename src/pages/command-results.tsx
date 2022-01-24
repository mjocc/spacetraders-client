import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import prettyjson from 'prettyjson';
import { useEffect, useState } from 'react';
import { Alert, Stack } from 'react-bootstrap';
import { ArrowLeft } from 'react-feather';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import LoadingScreen from '../components/LoadingScreen';
import ManageHistoryButtonGroup from '../components/ManageHistoryButtons';
import { useAppSelector } from '../store/hooks';
import { selectHistoryById } from '../store/slices/commandHistory';

SyntaxHighlighter.registerLanguage('yaml', yaml);

const ViewCommandResult: NextPage = () => {
  const router = useRouter();
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

  return (
    <>
      <Head>
        <title>Result | SpaceTraders Client</title>
        <meta name="description" content="Results from executed command" />
      </Head>

      <Stack direction="horizontal" className="mb-2" gap={2}>
        {back && (
          <Link href="/command-history" passHref>
            <ArrowLeft role="button" size={28} />
          </Link>
        )}
        <h1 className="h5 mb-0">Query results</h1>
        {historyItem && (
          <ManageHistoryButtonGroup className="ms-auto" {...historyItem} />
        )}
      </Stack>

      {router.query ? (
        id ? (
          historyItem ? (
            <SyntaxHighlighter language="yaml" style={atomDark}>
              {prettyjson.render(historyItem.results)}
            </SyntaxHighlighter>
          ) : (
            <Alert variant="warning">
              Invalid &lsquo;id&rsquo; query parameter. The history item may
              have been deleted.
            </Alert>
          )
        ) : (
          <Alert variant="warning">
            No &lsquo;id&rsquo; query parameter provided.
          </Alert>
        )
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default ViewCommandResult;
