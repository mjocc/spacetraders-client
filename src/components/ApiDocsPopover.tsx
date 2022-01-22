import { FC } from 'react';
import { OverlayTrigger, OverlayTriggerProps, Popover } from 'react-bootstrap';
import Tooltip from './Tooltip';

interface ApiDocsPopoverProps {
  children: OverlayTriggerProps['children'];
}

const ApiDocsPopover: FC<ApiDocsPopoverProps> = ({ children }) => {
  return (
    <OverlayTrigger
      trigger="click"
      placement="top-end"
      overlay={
        <Popover style={{ minWidth: '1035px' }}>
          <Popover.Header as="h3">API docs</Popover.Header>
          <Popover.Body>
            <iframe
              title="Api docs"
              height={600}
              width={1000}
              src={process.env.NEXT_PUBLIC_API_PATH}
            />
          </Popover.Body>
        </Popover>
      }
    >
      <div>
        <Tooltip tooltipText={'Toggle API docs popup'}>{children}</Tooltip>
      </div>
    </OverlayTrigger>
  );
};

export default ApiDocsPopover;
