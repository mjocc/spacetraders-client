import { startCase } from 'lodash';
import { NextPage } from 'next';
import { ListGroup } from 'react-bootstrap';
import DataCard from '../../components/DataCard';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { Goods, useGetGoodsQuery } from '../../store/slices/spaceTraders';

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
        {(data: Goods) => (
          <DataCardLayout>
            {data.goods.map((good) => (
              <DataCard
                key={good.name}
                title={startCase(good.name.toLowerCase())}
                data={good}
                renderListItem={(key, value) => (
                  <ListGroup.Item key={key}>
                    <span className="fw-bold">{startCase(key)}</span>:{' '}
                    <span>{value.toString()}</span>
                  </ListGroup.Item>
                )}
                buttonText="Purchase good"
                // TODO: Integrate 'onButtonClick' logic
                onButtonClick={() => {}}
                ignoreDataKeys={['name', 'symbol']}
              />
            ))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default GoodsPage;
