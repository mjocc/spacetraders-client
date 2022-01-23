import { useRouter } from 'next/router';
import {
  Dispatch,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { Button, ButtonGroup, ButtonProps } from 'react-bootstrap';
import { RefreshCw, Trash } from 'react-feather';
import { MethodType, useRunCommand } from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectToken } from '../store/slices/auth';
import { removeHistoryItem } from '../store/slices/commandHistory';
import { useToast } from '../store/slices/outcomeToasts';
import ConfirmationModal from './ConfirmationModal';
import Tooltip from './Tooltip';

interface ManageHistoryButtonProps extends ButtonProps {
  tooltipText: string;
}

const ManageHistoryButton: FC<PropsWithChildren<ManageHistoryButtonProps>> = ({
  children,
  tooltipText,
  ...buttonProps
}) => {
  return (
    <Tooltip tooltipText={tooltipText}>
      <Button variant="secondary" {...buttonProps}>
        {children}
      </Button>
    </Tooltip>
  );
};

interface ManageHistoryButtonGroupProps {
  method: MethodType;
  id: string;
  path: string;
  body: string;
  className?: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

const ManageHistoryButtonGroup: FC<ManageHistoryButtonGroupProps> = ({
  method,
  id,
  path,
  body,
  className,
  setModalOpen,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { openToast } = useToast();
  const token = useAppSelector(selectToken);
  const runCommand = useRunCommand(token, true);
  const [rerunning, setRerunning] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const rerunCommand: MouseEventHandler = async (event) => {
    event.stopPropagation();
    await runCommand({
      method,
      path,
      body,
      setRunning: setRerunning,
      successMessage: 'Command successfully rerun.',
    });
  };

  const removeItemConfirmation: MouseEventHandler = (event) => {
    event.stopPropagation();
    setShowConfirmation(true);
    setModalOpen && setModalOpen(true);
  };

  const removeItem = () => {
    setModalOpen && setModalOpen(false);
    dispatch(removeHistoryItem(id));
    openToast('success', 'History item successfully deleted.');
    router.push('/command-history');
  };

  return (
    <>
      <ButtonGroup className={className} aria-label="Basic example" size="sm">
        <ManageHistoryButton tooltipText="Rerun command" onClick={rerunCommand}>
          <RefreshCw className={rerunning ? 'animate rotate' : ''} size={14} />
        </ManageHistoryButton>
        <ManageHistoryButton
          tooltipText="Remove from history"
          onClick={removeItemConfirmation}
        >
          <Trash size={14} />
        </ManageHistoryButton>
      </ButtonGroup>
      <ConfirmationModal
        show={showConfirmation}
        title="Removal confirmation"
        buttonText="Remove"
        handleClose={() => setShowConfirmation(false)}
        onConfirmation={removeItem}
      >
        Are you sure you want to remove the item from history? This is
        irreversible.
      </ConfirmationModal>
    </>
  );
};

export default ManageHistoryButtonGroup;
