import { NextPage } from 'next';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { useGetStructuresQuery } from '../../store/slices/spaceTraders/api';
import { Structure } from '../../store/slices/spaceTraders/types';

interface StructuresPageProps {}

const StructuresPage: NextPage<StructuresPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetStructuresQuery(token);
  return (
    <>
      <StandardPageHead
        title="Structures"
        description="Structures available to create"
      />
      <LoadingGate<Structure[]> token={token} {...queryResult}>
        {(data) => (
          <DataCardLayout
            pageTitle="Available Structures"
            ignoreDataKeys={['type', 'name']}
            defaultOrderKey="name"
          >
            {data.map((structure) => ({
              key: structure.type,
              title: structure.name,
              data: structure,
              buttonText: 'Create new structure',
              // TODO: Integrate 'onButtonClick' logic
              onButtonClick: () => {},
            }))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default StructuresPage;
