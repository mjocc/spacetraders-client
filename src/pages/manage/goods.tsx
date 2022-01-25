import { startCase } from 'lodash';
import { NextPage } from 'next';
import { ListGroup } from 'react-bootstrap';
import DataCard from '../../components/DataCard';
import LoadingGate from '../../components/LoadingGate';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { Goods, useGetGoodsQuery } from '../../store/slices/spaceTraders';

interface GoodsPageProps {}

const GoodsPage: NextPage<GoodsPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetGoodsQuery(token);
  return (
    <LoadingGate token={token} {...queryResult}>
      {(data: Goods) => (
        <div className="scroll-container">
          <div className="d-flex flex-wrap gap-2 justify-content-center">
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
          </div>
        </div>
      )}
    </LoadingGate>
  );
};

export default GoodsPage;
