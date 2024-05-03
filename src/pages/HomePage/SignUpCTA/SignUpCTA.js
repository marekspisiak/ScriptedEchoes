import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LinkButton from "../../../components/buttons/LinkButton";
import styles from "./SignUpCTA.module.scss";

function SignUpCTA() {
  return (
    <Container className={`${styles.ctaContainer}`}>
      <Row>
        <Col>
          <h2 className={styles.header}>Staňte sa autorom na ScriptedEchoes</h2>
          <p className={styles.text}>
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
