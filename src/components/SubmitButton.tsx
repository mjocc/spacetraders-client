import { FC, PropsWithChildren } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const SubmitButton: FC<
  PropsWithChildren<{ variant?: string; submitting: boolean }>
> = ({ variant, submitting, children }) => {
  return (
    <Button variant={variant ? variant : 'primary'} type="submit">
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
