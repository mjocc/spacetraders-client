import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import prettyjson from 'prettyjson';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { isValidJson } from '../lib/utils';

SyntaxHighlighter.registerLanguage('yaml', yaml);

const ViewCommandResult: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Result | Spacetraders Client</title>
        <meta name="description" content="Results from executed command" />
        <link rel="icon" type="image/svg+xml" href="/spacetraders.svg" />
      </Head>
      <Container className="mt-3">
        <h1 className="h5">Query results</h1>
        {router.query ? (
          router.query.results ? (
            isValidJson(router.query.results as string) ? (
              <SyntaxHighlighter language="yaml" style={atomDark}>
                {prettyjson.render(JSON.parse(router.query.results as string))}
              </SyntaxHighlighter>
            ) : (
              "Invalid 'results' query parameter."
            )
          ) : (
            "No 'results' query parameter provided."
          )
        ) : (
          'Loading...'
        )}
      </Container>
    </>
  );
};

export default ViewCommandResult;
