import { NextPage } from 'next';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { useGetGoodsQuery } from '../../store/slices/spaceTraders/api';
import { Good } from '../../store/slices/spaceTraders/types';

interface GoodsPageProps {}

const GoodsPage: NextPage<GoodsPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetGoodsQuery(token);
  return (
    <>
      <StandardPageHead
        title="Goods"
        description="Goods available to purchase"
      />
      <LoadingGate token={token} {...queryResult}>
        {(data: Good[]) => (
          <DataCardLayout
            ignoreDataKeys={['name', 'symbol']}
            defaultOrderKey="name"
          >
            {data.map((good) => ({
              key: good.name,
              title: good.name,
              data: good,
              buttonText: 'Purchase good',
              // TODO: Integrate 'onButtonClick' logic
              onButtonClick: () => {},
            }))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default GoodsPage;
