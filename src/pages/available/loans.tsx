import { NextPage } from 'next';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { useGetLoansQuery, useTakeOutLoanMutation } from '../../store/slices/spaceTraders/api';
import { Loan } from '../../store/slices/spaceTraders/types';

interface LoansPageProps { }
// TODO: add currently taken loan display to this page (since can only have one)
const LoansPage: NextPage<LoansPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetLoansQuery(token);
  const [takeOutLoan, mutationResult] = useTakeOutLoanMutation()
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
          >
            {data.map((loan) => ({
              key: loan.type,
              title: loan.type,
              data: loan,
              buttonText: 'Take loan',
              //TODO: add spinner while loading + notification once taken
              onButtonClick: () => {
                takeOutLoan({ token, type: loan.type })
              },
            }))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default LoansPage;
