import Head from 'next/head';
import { FC } from 'react';

interface StandardPageHeadProps {
  title: string;
  description: string;
}

const StandardPageHead: FC<StandardPageHeadProps> = ({
  title,
  description,
}) => {
  return (
    <Head>
      <title>{title} | SpaceTraders Client</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default StandardPageHead;
