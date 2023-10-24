import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Benefits from "../components/Benefits";
import { Container, Row, Col } from "react-bootstrap";
const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Container fluid className="main-container mt-5">
        {/* Výhody písania na ScriptedEchoes */}
        <Row className="benefits-section mb-5">
          <Col>
            {/* <Benefits /> */}
            <Benefits /> {/* Iba pre demonstráciu */}
          </Col>
        </Row>

        {/* Najnovšie články */}
        <Row className="latest-articles-section mb-5">
          <Col>
            {/* <LatestArticles /> */}
            <h2>Latest Articles Component Placeholder</h2>{" "}
            {/* Iba pre demonstráciu */}
          </Col>
        </Row>

        {/* Výzva na prihlásenie alebo vytvorenie účtu */}
        <Row className="signup-cta-section">
          <Col>
            {/* <SignUpCTA /> */}
            <h2>Sign Up CTA Component Placeholder</h2>{" "}
            {/* Iba pre demonstráciu */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
