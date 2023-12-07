// components/HeroBlogSection.jsx

import { Container, Row, Col } from "react-bootstrap";

function BlogHeroSection() {
  return (
    <Row className="blog-hero-section justify-content-center align-items-center">
      <Col md={8} className="text-center">
        <h1>Náš Blog</h1>
        <p>Objavte najnovšie články a inšpirujte sa príbehmi našich autorov.</p>
      </Col>
    </Row>
  );
}

export default BlogHeroSection;
