import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>ScriptedEchoes</h5>
            <p>
              Zdieľajte svoje príbehy, skúsenosti a názory s komunitou na našom
              blogovom portáli.
            </p>
          </Col>
          <Col md={4}>
            <h5>Užitočné odkazy</h5>
            <ul>
              <li>
                <a href="/about">O nás</a>
              </li>
              <li>
                <a href="/contact">Kontakt</a>
              </li>
              <li>
                <a href="/terms">Obchodné podmienky</a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Sledujte nás</h5>
            <a href="#">Facebook</a>
            <br />
            <a href="#">Twitter</a>
            <br />
            <a href="#">Instagram</a>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            &copy; {new Date().getFullYear()} ScriptedEchoes. Všetky práva
            vyhradené.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
