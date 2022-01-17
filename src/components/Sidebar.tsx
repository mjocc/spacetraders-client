import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar: FC = () => {
  const router = useRouter();

  const NavLink: FC<
    PropsWithChildren<{
      href: string;
      hiddenUntilActive?: boolean;
      [key: string]: any;
    }>
  > = (props) => {
    const { href, hiddenUntilActive, children, ...linkProps } = props;

    return (
      <Nav.Item >
        <Link href={href} passHref>
          <Nav.Link {...linkProps}>{children}</Nav.Link>
        </Link>
      </Nav.Item>
    );
  };

  return (
    <Nav variant="pills" className="flex-column" activeKey={router.pathname}>
      <NavLink href="/view-command-result" hiddenUntilActive>
        Command results
      </NavLink>
      <NavLink href="/">Home</NavLink>
    </Nav>
  );
};

export default Sidebar;
