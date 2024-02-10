import HeroSection from "./HeroSection/HeroSection";
import Benefits from "./Benefits/Benefits";
import HomeArticles from "./HomeArticles/HomeArticles";
import SignUpCTA from "./SignUpCTA/SignUpCTA";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./HomePage.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [newestPosts, setNewestPosts] = useState([]);
  const [mostPopularPosts, setMostPopularPosts] = useState([]);

  const fetchFeaturedPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/featured");
      setNewestPosts(response.data.newestPosts);
      setMostPopularPosts(response.data.mostPopularPosts);
    } catch (error) {
      console.error("Error fetching featured articles:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

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
            <HomeArticles title="Najnovšie články" articles={newestPosts} />
          </Col>
        </Row>
        <Row>
          <Col>
            <HomeArticles
              title="Najpopulárnejšie články"
              articles={mostPopularPosts}
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
