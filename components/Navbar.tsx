import Link from 'next/link';
import { FC } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const CustomNavbar: FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
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
        <Nav className="me-auto">
          <Link href="/">
            <Nav.Link href="/">Home</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
