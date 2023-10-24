import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";

function SignUpCTA() {
  return (
    <Container className="cta-container text-center my-5">
      <Row>
        <Col>
          <h2>Staňte sa autorom na ScriptedEchoes</h2>
          <p>
            Zdieľajte svoje príbehy, skúsenosti a názory s komunitou. Začnite
            písať ešte dnes a dosiahnite široké publikum.
          </p>
          <Button variant="primary" size="lg" href="/signup">
            Začnite písať
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpCTA;
