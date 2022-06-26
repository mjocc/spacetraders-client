import { NextPage } from 'next';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { useGetLoansQuery } from '../../store/slices/spaceTraders/api';
import { Loan } from '../../store/slices/spaceTraders/types';

interface LoansPageProps {}

const LoansPage: NextPage<LoansPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetLoansQuery(token);
  return (
    <>
      <StandardPageHead
        title="Loans"
        description="Loans available to purchase"
      />
      <LoadingGate token={token} {...queryResult}>
        {(data: Loan[]) => (
          <DataCardLayout ignoreDataKeys={['type']} defaultOrderKey="type">
            {data.map((loan) => ({
              key: loan.type,
              title: loan.type,
              data: loan,
              buttonText: 'Take loan',
              // TODO: Integrate 'onButtonClick' logic
              onButtonClick: () => {},
            }))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default LoansPage;
