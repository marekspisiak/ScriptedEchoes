import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Benefits from "../components/Benefits";
import HomeArticles from "../components/HomeArticles";
import SignUpCTA from "../components/SignUpCTA";
import { Container, Row, Col } from "react-bootstrap";
const HomePage = () => {
  const latestArticles = [
    {
      title: "Najnovší článok 1",
      description: "Popis článku...",
      image: "path_to_image1.jpg",
      date: "24.10.2023",
    },
    {
      title: "Najnovší článok 2",
      description: "Popis článku...",
      image: "path_to_image2.jpg",
      date: "23.10.2023",
    },
    // ... ďalšie články
  ];

  const popularArticles = [
    {
      title: "Populárny článok 1",
      description: "Popis článku...",
      image: "path_to_image3.jpg",
      date: "15.10.2023",
    },
    {
      title: "Populárny článok 2",
      description: "Popis článku...",
      image: "path_to_image4.jpg",
      date: "10.10.2023",
    },
    // ... ďalšie články
  ];
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
            <HomeArticles title="Najnovšie články" articles={latestArticles} />
            <HomeArticles
              title="Najpopulárnejšie články"
              articles={popularArticles}
            />{" "}
            {/* Iba pre demonstráciu */}
          </Col>
        </Row>

        {/* Výzva na prihlásenie alebo vytvorenie účtu */}
        <Row className="signup-cta-section">
          <Col>
            {/* <SignUpCTA /> */}
            <SignUpCTA /> {/* Iba pre demonstráciu */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
