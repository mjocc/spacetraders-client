import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { Nav } from 'react-bootstrap';

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

  return (
    <Nav variant="pills" className="flex-column" activeKey={router.pathname}>
      <NavLink href="/">Home</NavLink>
      <hr className="my-2" />
      <NavLink href="/manage/loans">Loans</NavLink>
      <NavLink href="/manage/goods">Goods</NavLink>
      <NavLink href="/manage/ships">Ships</NavLink>
      <NavLink href="/command-results" hiddenUntilActive>
        Command results
      </NavLink>
      <NavLink href="/command-history" hiddenUntilActive>
        Command history
      </NavLink>
    </Nav>
  );
};

export default Sidebar;
