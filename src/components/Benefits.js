import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function Benefits() {
  const benefitsData = [
    {
      title: "Jednoduchá publikácia",
      description:
        "Rýchlo a ľahko publikujte svoje články bez technických znalostí.",
      icon: "/holder.jpg",
    },
    {
      title: "Dosiahnite širšie publikum",
      description:
        "Využite našu rastúcu komunitu čitateľov a zdieľajte svoje myšlienky so svetom.",
      icon: "/holder.jpg",
    },
    {
      title: "Úpravy v reálnom čase",
      description:
        "Editujte a aktualizujte svoje články kedykoľvek potrebujete.",
      icon: "/holder.jpg",
    },
  ];

  return (
    <Row className="justify-content-md-center">
      {benefitsData.map((benefit, index) => (
        <Col md={4} key={index}>
          <Card className="mb-4 benefits-card">
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
