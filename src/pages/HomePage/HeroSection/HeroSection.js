import Container from "react-bootstrap/Container";
import LinkButton from "../../../components/buttons/LinkButton";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-section-container">
      <Container className="hero-section d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-3 mb-3">Zdieľajte svoj príbeh</h1>
        <p className="lead mb-4">
          Zdieľajte svoje skúsenosti, nápady a myšlienky so svetom na
          ScriptedEchoes.
        </p>
        <LinkButton to="/create" variant={"highlight"}>
          Začnite písať
        </LinkButton>
      </Container>
    </div>
  );
}

export default HeroSection;
