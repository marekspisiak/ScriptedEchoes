import React from "react";
import { Card } from "react-bootstrap";
import LinkButton from "../buttons/LinkButton";

const ProfileDetailsCard = ({ username, email, isEditable, image }) => {
  return (
    <Card className="mb-3">
      {image && <Card.Img variant="top" src={image} alt="Profilový obrázok" />}{" "}
      {/* Pridané zobrazovanie obrázku */}
      <Card.Body>
        <Card.Title>Profilové Detaily</Card.Title>
        <Card.Text>
          <strong>Meno:</strong> {username}
          <br />
          <strong>E-mail:</strong> {email}
        </Card.Text>
        {isEditable && (
          <LinkButton to="/edit-profile" variant="primary">
            Editovať Profil
          </LinkButton>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileDetailsCard;
