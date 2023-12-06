import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LinkButton from "../components/buttons/LinkButton"; // Predpokladá sa, že toto je vlastný komponent

const FinishSignupPage = () => {
  return (
    <Container className="my-5 py-5 text-center finish-signup-container">
      <Row className="justify-content-center">
        <Col lg={8}>
          <h1 className="display-4">Vitajte na ScriptedEchoes!</h1>
          <p className="lead">
            Ďakujeme za registráciu. Dokončite svoj profil pre najlepší zážitok.
          </p>
          <div className="mt-4">
            <LinkButton to="/edit-profile" className="">
              Dokončiť Profil Teraz
            </LinkButton>
            <LinkButton
              to={sessionStorage.getItem("lastVisitedRoute") || "/"}
              className=""
            >
              Urobím To Neskôr
            </LinkButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FinishSignupPage;
