import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import LinkButton from "../../components/buttons/LinkButton";

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
          <LinkButton to="/create" variant={"highlight"}>
            Začnite písať
          </LinkButton>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpCTA;
