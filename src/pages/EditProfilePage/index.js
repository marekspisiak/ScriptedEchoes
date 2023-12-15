import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "../../components/buttons/Button";

import { useAuth } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../components/buttons/LinkButton";

const EditProfilePage = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { changeUsername } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await changeUsername(username);
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Editovať Profil</h2>

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

            {errorMessage && (
              <div className="error-message text-danger">{errorMessage}</div>
            )}

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
