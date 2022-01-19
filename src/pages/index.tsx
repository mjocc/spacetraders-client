import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Stack } from 'react-bootstrap';
import { useAppDispatch } from '../store/hooks';
import { getManageToast } from '../store/slices/outcomeToasts';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { openToast } = getManageToast(dispatch);
  return (
    <>
      <Head>
        <title>Home | SpaceTraders Client</title>
        <meta name="description" content="Client for spacetraders.io game" />
      </Head>
      <Stack>
        <Button
          variant="success"
          onClick={() => {
            openToast('success');
          }}
        >
          Success toast
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            openToast('error');
          }}
        >
          Error toast
        </Button>
      </Stack>
    </>
  );
};

export default Home;
