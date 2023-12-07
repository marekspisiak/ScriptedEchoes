import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import StartWritingButton from "../../components/buttons/StartWritingButton";

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
          <StartWritingButton />
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpCTA;
