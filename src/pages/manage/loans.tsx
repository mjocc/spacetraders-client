import { startCase } from 'lodash';
import { NextPage } from 'next';
import { ListGroup } from 'react-bootstrap';
import DataCard from '../../components/DataCard';
import LoadingGate from '../../components/LoadingGate';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { Loans, useGetLoansQuery } from '../../store/slices/spaceTraders';

interface LoansPageProps {}

const LoansPage: NextPage<LoansPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetLoansQuery(token);
  return (
    <LoadingGate token={token} {...queryResult}>
      {(data: Loans) => (
        <div className="d-flex flex-wrap gap-2">
          {data.loans.map((loan) => (
            <DataCard
              key={loan.type}
              title={startCase(loan.type.toLowerCase())}
              data={loan}
              renderListItem={(key, value) => (
                <ListGroup.Item key={key}>
                  <span className="fw-bold">{startCase(key)}</span>:{' '}
                  <span>{value.toString()}</span>
                </ListGroup.Item>
              )}
              buttonText="Take loan"
              // TODO: Integrate 'onButtonClick' logic
              onButtonClick={() => {}}
              ignoreDataKeys={['type']}
            />
          ))}
        </div>
      )}
    </LoadingGate>
  );
};

export default LoansPage;
