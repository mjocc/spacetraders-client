import type { NextPage } from 'next';
import StandardPageHead from '../components/StandardPageHead';

const Home: NextPage = () => {
  return (
    <>
      <StandardPageHead
        title="Home"
        description="Client for spacetraders.io game"
      />
    </>
  );
};

export default Home;
