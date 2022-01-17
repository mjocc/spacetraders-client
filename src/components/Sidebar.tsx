import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { Nav, NavLinkProps } from 'react-bootstrap';

type CustomNavLinkProps = PropsWithChildren<{
  href: string;
  hiddenUntilActive?: boolean;
}>;

const NavLink: FC<CustomNavLinkProps> = (props) => {
  const router = useRouter();
  const { href, hiddenUntilActive, children, ...linkProps } = props;

  return (
    <Nav.Item hidden={hiddenUntilActive && router.pathname !== href}>
      <Link href={href} passHref>
        <Nav.Link {...linkProps}>{children}</Nav.Link>
      </Link>
    </Nav.Item>
  );
};

const Sidebar: FC = () => {
  const router = useRouter();

  return (
    <Nav variant="pills" className="flex-column" activeKey={router.pathname}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/view-command-results" hiddenUntilActive>
        Command results
      </NavLink>
    </Nav>
  );
};

export default Sidebar;
