import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ChangePasswordCard = () => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Zmena Hesla</Card.Title>
        <Card.Text>Zmena hesla pre váš účet.</Card.Text>
        <Link to="/change-password" className="btn btn-warning">
          Zmeniť Heslo
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ChangePasswordCard;
