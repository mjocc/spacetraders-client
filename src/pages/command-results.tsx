import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import prettyjson from 'prettyjson';
import { useEffect, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { useAppSelector } from '../store/hooks';
import { selectHistoryById } from '../store/slices/commandHistory';

SyntaxHighlighter.registerLanguage('yaml', yaml);

const ViewCommandResult: NextPage = () => {
  const router = useRouter();
  const [id, setId] = useState<string>('');
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
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Result | SpaceTraders Client</title>
        <meta name="description" content="Results from executed command" />
      </Head>
      <h1 className="h5">Query results</h1>
      {router.query ? (
        id ? (
          historyItem ? (
            <SyntaxHighlighter language="yaml" style={atomDark}>
              {prettyjson.render(historyItem.results)}
            </SyntaxHighlighter>
          ) : (
            "Invalid 'id' query parameter. The history item may have been deleted."
          )
        ) : (
          "No 'id' query parameter provided."
        )
      ) : (
        'Loading...'
      )}
    </>
  );
};

export default ViewCommandResult;
