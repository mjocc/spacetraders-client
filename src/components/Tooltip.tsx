import { FC } from 'react';
import {
  OverlayTrigger,
  OverlayTriggerProps,
  Tooltip as OverlayTooltip,
} from 'react-bootstrap';

interface TooltipProps {
  tooltipText: string;
  placement?: OverlayTriggerProps['placement'];
  children: OverlayTriggerProps['children'];
}

const Tooltip: FC<TooltipProps> = ({
  tooltipText,
  placement = 'top',
  children,
}) => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={<OverlayTooltip>{tooltipText}</OverlayTooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;
