import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function Benefits() {
  const benefitsData = [
    {
      title: "Jednoduchá publikácia",
      description:
        "Rýchlo a ľahko publikujte svoje články bez technických znalostí.",
      icon: "path_to_icon1.png",
    },
    {
      title: "Dosiahnite širšie publikum",
      description:
        "Využite našu rastúcu komunitu čitateľov a zdieľajte svoje myšlienky so svetom.",
      icon: "path_to_icon2.png",
    },
    {
      title: "Úpravy v reálnom čase",
      description:
        "Editujte a aktualizujte svoje články kedykoľvek potrebujete.",
      icon: "path_to_icon3.png",
    },
    // Môžete pridať ďalšie výhody podľa potreby
  ];

  return (
    <Row className="justify-content-md-center">
      {benefitsData.map((benefit, index) => (
        <Col md={4} key={index}>
          <Card className="mb-4">
            <Card.Img variant="top" src={benefit.icon} />
            <Card.Body>
              <Card.Title>{benefit.title}</Card.Title>
              <Card.Text>{benefit.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Benefits;
