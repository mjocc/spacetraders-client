import { startCase } from 'lodash';
import { NextPage } from 'next';
import { Col, Row } from 'react-bootstrap';
import DataCard from '../../components/DataCard';
import LoadingGate from '../../components/LoadingGate';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import { Loan, Loans, useGetLoansQuery } from '../../store/slices/spaceTraders';

interface LoansPageProps {}

const LoansPage: NextPage<LoansPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetLoansQuery(token);
  return (
    <LoadingGate token={token} {...queryResult}>
      {(data: Loans) => (
        <Row>
          <Col xs={4}>
            {data.loans.map((loan) => (
              <DataCard
                key={loan.type}
                title={startCase(loan.type.toLowerCase())}
                data={loan}
                buttonText="Take loan"
                // TODO: Integrate 'onButtonClick' logic
                onButtonClick={() => {}}
                ignoreDataKeys={['type']}
              />
            ))}
          </Col>
        </Row>
      )}
    </LoadingGate>
  );
};

export default LoansPage;
