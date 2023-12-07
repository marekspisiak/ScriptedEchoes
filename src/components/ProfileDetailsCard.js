import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProfileDetailsCard = ({ username, email, isEditable }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Profilové Detaily</Card.Title>
        <Card.Text>
          <strong>Meno:</strong> {username}
          <br />
          <strong>E-mail:</strong> {email}
        </Card.Text>
        {isEditable && (
          <Link to="/edit-profile" className="btn btn-basic">
            Editovať Profil
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileDetailsCard;
