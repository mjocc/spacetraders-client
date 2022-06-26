import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Layout: FC<PropsWithChildren<{ sidebar: ReactNode }>> = ({
  sidebar,
  children,
}) => (
  <Container fluid style={{ paddingTop: '57px' }}>
    <Row className="mt-3">
      <Col xs={2} className="position-fixed left-0">
        {sidebar}
      </Col>
      <Col xs={12} style={{ paddingLeft: '16.666667%' }}>
        <Container>{children}</Container>
      </Col>
    </Row>
  </Container>
);

export default Layout;
