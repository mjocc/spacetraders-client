import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Layout: FC<PropsWithChildren<{ sidebar: ReactNode }>> = ({
  sidebar,
  children,
}) => (
  <Container fluid style={{ paddingTop: '57px' }}>
    <Row>
      <Col
        xs={2}
        className="position-fixed left-0 pt-3"
        style={{
          height: 'calc(100vh - 57px)',
          borderRight: '1px solid #282828',
        }}
      >
        {sidebar}
      </Col>
      <Col xs={12} className="mt-3" style={{ paddingLeft: '16.666667%' }}>
        <Container>{children}</Container>
      </Col>
    </Row>
  </Container>
);

export default Layout;
