import { NextPage } from 'next';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectHistory,
  selectHistoryTotal,
} from '../store/slices/commandHistory';

interface CommandHistoryProps {}

const CommmandHistory: NextPage<CommandHistoryProps> = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectHistory);
  const historyTotal = useAppSelector(selectHistoryTotal);

  return (
    <>
      <Head>
        <title>Command History | SpaceTraders Client</title>
        <meta
          name="description"
          content="History of commands issued to api.spacetraders.io"
        />
      </Head>
    </>
  );
};

export default CommmandHistory;
