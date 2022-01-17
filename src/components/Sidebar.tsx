import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';
import { Nav } from 'react-bootstrap';

const NavLink: FC<PropsWithChildren<{ href: string; [key: string]: any }>> = (
  props
) => {
  const { href, children, ...linkProps } = props;
  return (
    <Nav.Item>
      <Link href={href}>
        <Nav.Link href={href} {...linkProps}>
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  );
};

const Sidebar: FC = () => {
  const router = useRouter();
  return (
    <Nav variant="pills" className="flex-column" activeKey={router.pathname}>
      <NavLink href="/">Home</NavLink>
    </Nav>
  );
};

export default Sidebar;
