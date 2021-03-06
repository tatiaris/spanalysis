import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

/**
 * Footer component
 */
export const MFooter: React.FC = () => {
  return (
    <>
      <footer style={{ background: "aquamarine", padding: "2em", color: "black", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"  }}>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col sm="auto">
              <span>S&P 500 Market Analysis &copy; 2020-2021 by <a href="https://www.tatiaris.com">Rishabh Tatia</a></span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};