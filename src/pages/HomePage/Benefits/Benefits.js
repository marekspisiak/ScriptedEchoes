import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import BenefitsCard from "../../../components/cards/BenefitsCard/BenefitsCard";

function Benefits() {
  const benefitsData = [
    {
      title: "Jednoduchá publikácia",
      description:
        "Rýchlo a ľahko publikujte svoje články bez technických znalostí.",
      icon: "/easy-publication.jpg",
    },
    {
      title: "Dosiahnite širšie publikum",
      description:
        "Využite našu rastúcu komunitu čitateľov a zdieľajte svoje myšlienky so svetom.",
      icon: "/realtime-updates.jpg",
    },
    {
      title: "Úpravy v reálnom čase",
      description:
        "Editujte a aktualizujte svoje články kedykoľvek potrebujete.",
      icon: "/siroke-publikum.jpg",
    },
  ];

  return (
    <Row className="justify-content-md-center">
      {benefitsData.map((benefit, index) => (
        <Col md={4} key={index}>
          <BenefitsCard benefit={benefit} />
        </Col>
      ))}
    </Row>
  );
}

export default Benefits;
