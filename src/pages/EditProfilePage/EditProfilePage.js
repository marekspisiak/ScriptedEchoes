import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "../../components/buttons/Button";
import useResultMessage from "../../hooks/useResultMessage";
import { useAuth } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../components/buttons/LinkButton";
import ImageUpload from "../../components/ImageUpload";

const EditProfilePage = () => {
  const { updateProfile, user } = useAuth();
  const navigate = useNavigate();
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();

  const [image, setImage] = useState(user?.image);
  const [username, setUsername] = useState(user?.username || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    if (image) {
      formData.append("image", image);
    }

    try {
      await updateProfile(formData);
      successMessage("Profil bol úspešne aktualizovaný.");
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      errorMessage(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Editovať Profil</h2>
          {ResultComponent}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Užívateľské meno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zadajte nové užívateľské meno"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <ImageUpload onImageSelected={setImage} existingImageUrl={image} />

            <Button type="submit" className="mt-3" variant="primary">
              Uložiť Zmeny
            </Button>

            <LinkButton to="/profile" variant="secondary" className="m-3">
              Zrušiť
            </LinkButton>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;
