import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Benefits from "../components/Benefits";
import HomeArticles from "../components/HomeArticles";
import SignUpCTA from "../components/SignUpCTA";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
const HomePage = () => {
  const latestArticles = [
    {
      title: "Najnovší článok 1",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "24.10.2023",
    },
    {
      title: "Najnovší článok 2",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "23.10.2023",
    },
    {
      title: "Najnovší článok 2",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "23.10.2023",
    },
  ];

  const popularArticles = [
    {
      title: "Populárny článok 1",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "15.10.2023",
    },
    {
      title: "Populárny článok 2",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "10.10.2023",
    },
    {
      title: "Populárny článok 2",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "10.10.2023",
    },
  ];
  return (
    <>
      <Header />
      <HeroSection />
      <Container fluid className="main-container mt-5">
        <Row className="benefits-section mb-5">
          <Col>
            <Benefits />
          </Col>
        </Row>
        <Row className="latest-articles-section mb-5">
          <Col>
            <HomeArticles title="Najnovšie články" articles={latestArticles} />
            <HomeArticles
              title="Najpopulárnejšie články"
              articles={popularArticles}
            />
          </Col>
        </Row>

        <Row className="signup-cta-section">
          <Col>
            <SignUpCTA />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
