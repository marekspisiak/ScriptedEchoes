import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <footer className="p-3">
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
            <a href="/about">O nás</a>
            <br />
            <a href="/contact">Kontakt</a>
            <br />
            <a href="/terms">Obchodné podmienky</a>
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
