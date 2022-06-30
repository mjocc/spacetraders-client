import { NextPage } from 'next';
import {
  Dispatch,
  FC,
  FormEventHandler,
  SetStateAction,
  useState
} from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import DataCardLayout from '../../components/DataCardLayout';
import LoadingGate from '../../components/LoadingGate';
import StandardPageHead from '../../components/StandardPageHead';
import SubmitButton from '../../components/SubmitButton';
import { handleFormChange, handleFormChangeNum } from '../../lib/utils';
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/slices/auth';
import {
  useGetGoodsQuery,
  useGetMyShipsQuery
} from '../../store/slices/spaceTraders/api';
import { Good, MyShip } from '../../store/slices/spaceTraders/types';

type ModelInfo = { show: true; good: Good } | { show: false; good: null };

interface GoodsMutationModalProps {
  show: boolean;
  good: Good | null;
  setModelInfo: Dispatch<SetStateAction<ModelInfo>>;
  ships: MyShip[];
}

const GoodsMutationModal: FC<GoodsMutationModalProps> = ({
  show,
  good,
  setModelInfo,
  ships
}) => {
  const handleClose = () => setModelInfo({ show: false, good: null });
  const [submitting, setSubmitting] = useState(false);
  const [shipId, setShipId] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSubmitting(true);
    // TODO: implement this once more is implemented and it can actually be tested
    console.table({ quantity, shipId });
    setSubmitting(false);
    handleClose();
  };
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Purchase {good?.name}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="authentication-modal-username-field">
            <Form.Label>Ship</Form.Label>
            <Form.Select
              className="mb-3"
              value={shipId}
              onChange={handleFormChange(setShipId)}
            >
              {ships.map((ship) => (
                // TODO: add more info on ships rather than just id to dropdown
                <option key={ship.id} value={ship.id}>{ship.id}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="authentication-modal-token-field">
            <Stack direction="horizontal">
              <Form.Label>Quantity</Form.Label>
              <Form.Label className="ms-auto">
                (Total volume: {quantity * (good?.volumePerUnit ?? 0)})
              </Form.Label>
            </Stack>
            <Form.Control
              type="number"
              value={quantity}
              onChange={handleFormChangeNum(setQuantity)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <SubmitButton submitting={submitting} variant="primary">
            Purchase goods
          </SubmitButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

interface GoodsPageProps { }

const GoodsPage: NextPage<GoodsPageProps> = () => {
  const token = useAppSelector(selectToken);
  const queryResult = useGetGoodsQuery(token);
  const { data: shipsData } = useGetMyShipsQuery(token);
  const [modalInfo, setModalInfo] = useState<ModelInfo>({
    show: false,
    good: null,
  });
  return (
    <>
      <StandardPageHead
        title="Goods"
        description="Goods available to purchase"
      />
      <GoodsMutationModal
        {...modalInfo}
        setModelInfo={setModalInfo}
        ships={shipsData ?? []}
      />
      <LoadingGate<Good[]> token={token} {...queryResult}>
        {(data) => (
          <DataCardLayout
            pageTitle="Available Goods"
            ignoreDataKeys={['name', 'symbol']}
            defaultOrderKey="name"
          >
            {data.map((good) => ({
              key: good.name,
              title: good.name,
              data: good,
              buttonText: 'Purchase good',
              onButtonClick: () => {
                setModalInfo({ show: true, good });
              },
            }))}
          </DataCardLayout>
        )}
      </LoadingGate>
    </>
  );
};

export default GoodsPage;
