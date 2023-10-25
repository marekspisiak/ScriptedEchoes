import Container from "react-bootstrap/Container";
import StartWritingButton from "./buttons/StartWritingButton";

function HeroSection() {
  return (
    <Container className="hero-section-home-page d-flex flex-column justify-content-center align-items-center">
      <h1 className="display-3 text-center mb-3">Zdieľajte svoj príbeh</h1>
      <p className="lead text-center mb-4">
        Zdieľajte svoje skúsenosti, nápady a myšlienky so svetom na
        ScriptedEchoes.
      </p>
      <StartWritingButton />
    </Container>
  );
}

export default HeroSection;
