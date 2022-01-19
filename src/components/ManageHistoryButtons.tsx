import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonProps,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { RefreshCw, Terminal, Trash } from 'react-feather';

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
  small?: boolean;
}
// TODO: Add option to not show view results button like when on /command-results

const ManageHistoryButtonGroup: FC<ManageHistoryButtonGroupProps> = ({
  small,
}) => {
  const size = small ? 14 : 18;
  // TODO: Make this work including a confirmation for removeItem -
  // TODO:  give logout confirmation modal a similar api to toasts but first fix toasts
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
  const removeItem = () => {};

  return (
    <ButtonGroup aria-label="Basic example" size={small ? 'sm' : undefined}>
      <ManageHistoryButton tooltipText="View results" onClick={viewResults}>
        <Terminal size={size} />
      </ManageHistoryButton>
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
