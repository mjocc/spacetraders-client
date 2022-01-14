import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <Head>
      <title>Home | Spacetraders Client</title>
      <meta name="description" content="Client for spacetraders.io game" />
      <link rel="icon" type="image/svg+xml" href="/spacetraders.svg" />
    </Head>
  );
};

export default Home;
