import { NextPage } from 'next';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useMutationResult } from '../../lib/utils';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import {
  useGetLoansQuery,
  useTakeOutLoanMutation
} from '../../store/slices/spaceTraders/api';
import { Loan } from '../../store/slices/spaceTraders/types';

interface LoansPageProps {}

const LoansPage: NextPage<LoansPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetLoansQuery(token);
  const [takeOutLoan, { isLoading }] = useTakeOutLoanMutation();
  const handleMutationResult = useMutationResult();

  return (
    <>
      <StandardPageHead
        title="Loans"
        description="Loans available to purchase"
      />
      <LoadingGate<Loan[]> token={token} {...queryResult}>
        {(data) => (
          <DataCardLayout
            pageTitle="Available Loans"
            ignoreDataKeys={['type']}
            defaultOrderKey="type"
            spinner={isLoading}
          >
            {data.map((loan) => ({
              key: loan.type,
              title: loan.type,
              data: loan,
              buttonText: 'Take loan',
              onButtonClick: () => {
                handleMutationResult(
                  () => takeOutLoan({ token, type: loan.type }),
                  'Loan taken out. See manage loans page for more information.'
                );
              },
            }))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default LoansPage;
