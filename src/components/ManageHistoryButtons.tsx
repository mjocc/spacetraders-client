import { useRouter } from 'next/router';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonProps,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { RefreshCw, Terminal, Trash } from 'react-feather';
import { MethodType, runCommand, viewCommandResults } from '../lib/utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectToken } from '../store/slices/spaceTraders';

interface ManageHistoryButtonProps extends ButtonProps {
  tooltipText: string;
}

const ManageHistoryButton: FC<PropsWithChildren<ManageHistoryButtonProps>> = (
  props
) => {
  const { children, tooltipText, ...buttonProps } = props;
  return (
    <OverlayTrigger placement="top" overlay={<Tooltip>{tooltipText}</Tooltip>}>
      <Button variant="secondary" {...buttonProps}>
        {children}
      </Button>
    </OverlayTrigger>
  );
};

interface ManageHistoryButtonGroupProps {
  method: MethodType;
  id: string;
  path: string;
  body: string;
  small?: boolean;
  noViewResultsButton?: boolean;
}

const ManageHistoryButtonGroup: FC<ManageHistoryButtonGroupProps> = ({
  method,
  id,
  path,
  body,
  small,
  noViewResultsButton,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const viewResults = () => viewCommandResults(router, id);
  const rerunCommand = () => {
    if (token) {
      runCommand({
        router,
        method,
        path,
        body,
        token,
        dispatch,
      });
    }
  };
  // TODO: Make this work including a confirmation for removeItem -
  // TODO:  give logout confirmation modal a similar api to toasts but first fix toasts
  const removeItem = () => {};

  const size = small ? 14 : 18;

  return (
    <ButtonGroup aria-label="Basic example" size={small ? 'sm' : undefined}>
      {!noViewResultsButton && (
        <ManageHistoryButton tooltipText="View results" onClick={viewResults}>
          <Terminal size={size} />
        </ManageHistoryButton>
      )}
      <ManageHistoryButton tooltipText="Rerun command" onClick={rerunCommand}>
        <RefreshCw size={size} />
      </ManageHistoryButton>
      <ManageHistoryButton
        tooltipText="Remove from history"
        onClick={removeItem}
      >
        <Trash size={size} />
      </ManageHistoryButton>
    </ButtonGroup>
  );
};

export default ManageHistoryButtonGroup;
