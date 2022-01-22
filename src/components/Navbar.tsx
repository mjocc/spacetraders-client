import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { Container, Dropdown, Navbar } from 'react-bootstrap';
import spaceTradersLogo from '../../public/spacetraders.svg';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearHistory } from '../store/slices/commandHistory';
import { useToast } from '../store/slices/outcomeToasts';
import {
  logout,
  selectAuthenticated,
  selectUsername,
} from '../store/slices/spaceTraders';
import ConfirmationModal from './ConfirmationModal';

const CustomNavbar: FC = () => {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector(selectAuthenticated);
  const username = useAppSelector(selectUsername);
  const { openToast } = useToast();

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <Navbar bg="dark" variant="dark" as="header">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand className="d-flex justify-content-center align-items-center">
            <Image
              alt="spacetraders logo"
              src={spaceTradersLogo}
              width="30"
              height="30"
            />
            <span className="ms-1">SpaceTraders Client</span>
          </Navbar.Brand>
        </Link>
        {authenticated && (
          <>
            <Dropdown role="button">
              <Dropdown.Toggle as={Navbar.Text}>
                Logged in as{' '}
                <span className="text-decoration-underline">{username}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowModal(true)}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ConfirmationModal
              show={showModal}
              title="Logout confirmation"
              buttonText="Logout"
              handleClose={() => setShowModal(false)}
              onConfirmation={() => {
                dispatch(logout());
                dispatch(clearHistory());
                openToast('success', 'Logged out successfully.');
              }}
            >
              Are you sure you want to log out? You&apos;ll have to enter your
              username and token again and your history will be cleared.
            </ConfirmationModal>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
