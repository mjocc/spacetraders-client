import { NextPage } from 'next';
import { Stack } from 'react-bootstrap';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { useGetShipsQuery } from '../../store/slices/spaceTraders/api';
import { Ship } from '../../store/slices/spaceTraders/types';

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
        {(data: Ship[]) => (
          <DataCardLayout
            ignoreDataKeys={['type', 'class']}
            defaultOrderKey="type"
          >
            {data.map((ship) => ({
              key: ship.type,
              title: (
                <Stack direction="horizontal">
                  <span>{ship.type}</span>
                  <small className="ms-auto text-muted">{ship.class}</small>
                </Stack>
              ),
              data: ship,
              buttonText: 'Purchase ship',
              // TODO: Integrate 'onButtonClick' logic
              onButtonClick: () => {},
            }))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default ShipsPage;
