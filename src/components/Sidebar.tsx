import dateFormat from 'dateformat';
import { startCase } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { ListGroup, Nav, Stack } from 'react-bootstrap';
import { useAppSelector } from '../store/hooks';
import { selectToken } from '../store/slices/auth';
import { useGetUserQuery } from '../store/slices/spaceTraders/api';
import { User } from '../store/slices/spaceTraders/types';
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
      <Nav.Item hidden={hiddenUntilActive && router.pathname !== href}>
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
  const { data: rawData, isSuccess, isLoading } = useGetUserQuery(token);
  let data: (Omit<User, 'username'> & { username?: string }) | undefined;
  if (isSuccess) {
    data = Object.assign({}, rawData);
    data['joinedAt'] = dateFormat(new Date(data.joinedAt), 'd mmmm, yyyy');
    delete data.username;
  }

  return (
    <Stack className="h-100">
      <Nav variant="pills" className="flex-column" activeKey={router.pathname}>
        <NavLink href="/">Home</NavLink>
        <hr className="my-2" />
        <NavLink href="/manage/loans">Loans</NavLink>
        <NavLink href="/manage/goods">Goods</NavLink>
        <NavLink href="/manage/ships">Ships</NavLink>
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
          data &&
          Object.entries(data).map(([key, value]) => (
            <ListGroup.Item key={key}>
              <span className="fw-bold">{startCase(key)}</span>:{' '}
              <span>{value.toString()}</span>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Stack>
  );
};

export default Sidebar;
