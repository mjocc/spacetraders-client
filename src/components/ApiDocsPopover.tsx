import { FC } from 'react';
import {
  OverlayTrigger,
  OverlayTriggerProps,
  Popover,
  Tooltip,
} from 'react-bootstrap';

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
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="top"
          overlay={
            <Tooltip id="api-docs-info-tooltip">Click for API docs</Tooltip>
          }
        >
          {children}
        </OverlayTrigger>
      </div>
    </OverlayTrigger>
  );
};

export default ApiDocsPopover;
