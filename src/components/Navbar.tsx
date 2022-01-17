import Link from 'next/link';
import { FC, useState } from 'react';
import { Container, Dropdown, Navbar } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getManageToast } from '../store/slices/outcomeToasts';
import {
  logout,
  selectAuthenticated,
  selectUsername,
} from '../store/slices/spaceTraders';
import LogoutConfirmationModal from './LogoutConfirmationModal';

const CustomNavbar: FC = () => {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector(selectAuthenticated);
  const username = useAppSelector(selectUsername);
  const { openToast } = getManageToast(dispatch);

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleClose = () => setShowModal(false);

  return (
    <Navbar bg="dark" variant="dark" as="header">
      <Container>
        <Link href="/">
          <Navbar.Brand href="/">
            <img
              alt="spacetraders logo"
              src="/spacetraders.svg"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            Spacetraders Client
          </Navbar.Brand>
        </Link>
        {authenticated && (
          <>
            <Dropdown>
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
            <LogoutConfirmationModal
              show={showModal}
              handleClose={handleClose}
              onConfirmation={() => {
                dispatch(logout());
                openToast('success', { success: 'Logged out successfully.' });
              }}
            />
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
