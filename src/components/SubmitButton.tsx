import { FC, PropsWithChildren } from 'react';
import { Button, ButtonProps, Spinner } from 'react-bootstrap';

interface SubmitButtonProps extends ButtonProps {
  submitting: boolean;
}

const SubmitButton: FC<PropsWithChildren<SubmitButtonProps>> = ({
  submitting,
  children,
  ...buttonProps
}) => {
  return (
    <Button {...buttonProps} type="submit">
      {submitting ? (
        <Spinner size="sm" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : children ? (
        children
      ) : (
        'Submit'
      )}
    </Button>
  );
};

export default SubmitButton;
