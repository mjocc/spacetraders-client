import { FC } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const SubmitButton: FC<{ variant?: string; submitting: boolean }> = ({
  variant,
  submitting,
}) => {
  return (
    <Button variant={variant ? variant : 'primary'} type="submit">
      {submitting ? (
        <Spinner size="sm" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        'Submit'
      )}
    </Button>
  );
};

export default SubmitButton;
