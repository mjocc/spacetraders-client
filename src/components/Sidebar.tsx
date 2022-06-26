import dateFormat from 'dateformat';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { Col, ListGroup, Nav, Row, Stack } from 'react-bootstrap';
import { useAppSelector } from '../store/hooks';
import { selectToken } from '../store/slices/auth';
import { useGetUserQuery } from '../store/slices/spaceTraders/api';
import LoadingScreen from './LoadingScreen';

type CustomNavLinkProps = PropsWithChildren<{
  href: string;
  hiddenUntilActive?: boolean;
}>;

const NavLink: FC<CustomNavLinkProps> = ({
  href,
  hiddenUntilActive,
  children,
  ...linkProps
}) => {
  const router = useRouter();

  return (
    <>
      {hiddenUntilActive && router.pathname === href && <hr className="my-2" />}
      <Nav.Item
        className="text-center"
        hidden={hiddenUntilActive && router.pathname !== href}
      >
        <Link href={href} passHref>
          <Nav.Link {...linkProps}>{children}</Nav.Link>
        </Link>
      </Nav.Item>
    </>
  );
};

const Sidebar: FC = () => {
  const router = useRouter();

  const token = useAppSelector(selectToken);
  const { data, isSuccess, isLoading } = useGetUserQuery(token);

  return (
    <Stack className="h-100">
      <Nav variant="pills" className="flex-column" activeKey={router.pathname}>
        <NavLink href="/">Home</NavLink>
        <hr className="mt-2 mb-1" />
        <span className="text-center text-muted">Available</span>
        <NavLink href="/available/goods">Goods</NavLink>
        <NavLink href="/available/loans">Loans</NavLink>
        <NavLink href="/available/structures">Structures</NavLink>
        <NavLink href="/available/ships">Ships</NavLink>
        <NavLink href="/command/results" hiddenUntilActive>
          Command results
        </NavLink>
        <NavLink href="/command/history" hiddenUntilActive>
          Command history
        </NavLink>
      </Nav>
      <ListGroup className="mt-auto mb-3">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          isSuccess && (
            <>
              <ListGroup.Item>
                <Row style={{ marginBottom: '-.1rem', marginTop: '-.25rem' }}>
                  <span className="text-muted text-center">Counts</span>
                </Row>
                <Row style={{ marginBottom: '-.2rem' }}>
                  <Col className="text-center">
                    <span className="fw-bold">Ships</span>
                  </Col>
                  <Col className="text-center">
                    <span className="fw-bold">Structure</span>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <span>{data.shipCount}</span>
                  </Col>
                  <Col className="text-center">
                    <span>{data.structureCount}</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <span className="fw-bold">Credits</span>:{' '}
                <span>{data.credits.toLocaleString()}</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <span className="fw-bold">Joined at</span>:{' '}
                <span>
                  {dateFormat(new Date(data.joinedAt), 'd mmmm, yyyy')}
                </span>
              </ListGroup.Item>
            </>
          )
        )}
      </ListGroup>
    </Stack>
  );
};

export default Sidebar;
