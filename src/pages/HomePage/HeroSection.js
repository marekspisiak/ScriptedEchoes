import Container from "react-bootstrap/Container";
import StartWritingButton from "../../components/buttons/StartWritingButton";
import LinkButton from "../../components/buttons/LinkButton";

function HeroSection() {
  return (
    <Container className="hero-section-home-page d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-3 text-center mb-3">Zdieľajte svoj príbeh</h1>
      <p className="lead text-center mb-4">
        Zdieľajte svoje skúsenosti, nápady a myšlienky so svetom na
        ScriptedEchoes.
      </p>
      <LinkButton to="/create" variant={"highlight"}>
        Začnite písať
      </LinkButton>
    </Container>
  );
}

export default HeroSection;
