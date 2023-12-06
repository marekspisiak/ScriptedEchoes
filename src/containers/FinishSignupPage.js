import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LinkButton from "../components/buttons/LinkButton";

const FinishSignupPage = () => {
  return (
    <>
      <Container className="text-center mt-5">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1>Vitajte na ScriptedEchoes!</h1>
            <p>
              Ďakujeme za registráciu. Dokončite svoj profil pre najlepší
              zážitok.
            </p>
            <LinkButton to="/edit-profile" variant="primary" size="lg">
              Dokončiť Profil Teraz
            </LinkButton>{" "}
            <LinkButton
              to={sessionStorage.getItem("lastVisitedRoute") || "/"}
              variant="secondary"
              size="lg"
            >
              Urobím To Neskôr
            </LinkButton>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FinishSignupPage;
