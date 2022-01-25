import { startCase } from 'lodash';
import { NextPage } from 'next';
import { ListGroup } from 'react-bootstrap';
import DataCard from '../../components/DataCard';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { Ships, useGetShipsQuery } from '../../store/slices/spaceTraders';

interface ShipsPageProps {}

const ShipsPage: NextPage<ShipsPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetShipsQuery(token);
  return (
    <>
      <StandardPageHead
        title="Ships"
        description="Ships available to purchase"
      />
      <LoadingGate token={token} {...queryResult}>
        {(data: Ships) => (
          <DataCardLayout>
            {data.ships.map((ship) => (
              <DataCard
                key={ship.type}
                title={ship.type}
                data={ship}
                renderListItem={(key, value) => (
                  <ListGroup.Item key={key}>
                    <span className="fw-bold">{startCase(key)}</span>:{' '}
                    <span>{value.toString()}</span>
                  </ListGroup.Item>
                )}
                buttonText="Purchase ship"
                // TODO: Integrate 'onButtonClick' logic
                onButtonClick={() => {}}
                ignoreDataKeys={['type']}
              />
            ))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default ShipsPage;
