// components/HeroBlogSection.jsx

import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/UserContext";

function BlogHeroSection() {
  const location = useLocation();
  const { user } = useAuth();

  // Analýza query stringu
  const queryParams = new URLSearchParams(location.search);

  // Získanie hodnoty pre konkrétny parameter, napríklad 'name'
  const userId = queryParams.get("userId");

  return (
    <Row className="blog-hero-section justify-content-center align-items-center">
      <Col md={8} className="text-center">
        {user?.user_id == userId ? (
          <div>
            <h1>Vaše príspevky</h1>
            <p>Spravujte svoje príspevky z jedného miesta</p>
          </div>
        ) : (
          <div>
            <h1>Náš Blog</h1>
            <p>
              Objavte najnovšiadasde články a inšpirujte sa príbehmi našich
              autorov.
            </p>
          </div>
        )}
      </Col>
    </Row>
  );
}

export default BlogHeroSection;
