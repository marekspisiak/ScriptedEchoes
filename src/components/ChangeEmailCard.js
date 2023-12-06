import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ChangeEmailCard = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Zmena E-mailu</Card.Title>
        <Card.Text>Aktualizujte váš kontaktný e-mail.</Card.Text>
        <Link to="/change-email" className="btn btn-secondary">
          Zmeniť E-mail
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ChangeEmailCard;
