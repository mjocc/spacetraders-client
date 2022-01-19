import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Layout: FC<PropsWithChildren<{ sidebar: ReactNode }>> = ({
  sidebar,
  children,
}) => (
  <Container fluid>
    <Row className="mt-3">
      <Col xs={2}>{sidebar}</Col>
      <Col xs={10}>
        <Container>{children}</Container>
      </Col>
    </Row>
  </Container>
);

export default Layout;
