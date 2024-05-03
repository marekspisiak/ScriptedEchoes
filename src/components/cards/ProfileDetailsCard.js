import React from "react";
import { Card } from "react-bootstrap";
import LinkButton from "../buttons/LinkButton";
import styles from "./ProfileDetailsCard.module.scss"; // Import štýlov

const ProfileDetailsCard = ({ username, email, isEditable, image }) => {
  return (
    <Card className={styles.cardContainer}>
      {image && (
        <Card.Img
          variant="top"
          src={image}
          alt="Profilový obrázok"
          className={styles.cardImage}
        />
      )}
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>Profilové Detaily</Card.Title>
        <Card.Text className={styles.cardText}>
          <strong>Meno:</strong> {username}
          <br />
          <strong>E-mail:</strong> {email}
        </Card.Text>
        {isEditable && (
          <LinkButton
            to="/edit-profile"
            variant="primary"
            className={styles.editButton}
          >
            Editovať Profil
          </LinkButton>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileDetailsCard;
