import HeroSection from "./HeroSection/HeroSection";
import Benefits from "./Benefits/Benefits";
import HomeArticles from "./HomeArticles/HomeArticles";
import SignUpCTA from "./SignUpCTA/SignUpCTA";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./HomePage.module.scss";
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
    <div className={styles.container}>
      <HeroSection />
      <Container fluid>
        <Row>
          <Col>
            <Benefits />
          </Col>
        </Row>
        <Row>
          <Col>
            <HomeArticles title="Najnovšie články" articles={latestArticles} />
          </Col>
        </Row>
        <Row>
          <Col>
            <HomeArticles
              title="Najpopulárnejšie články"
              articles={popularArticles}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <SignUpCTA />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
