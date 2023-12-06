import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import LinkButton from "../components/buttons/LinkButton";

const EditProfilePage = () => {
  const [username, setUsername] = useState("");
  const { user } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Tu nahraďte skutočným auth0_id užívateľa
      const auth0_id = user.sub;

      // Odoslanie požiadavky na aktualizáciu
      const response = await axios.put(
        `http://localhost:3001/users/${auth0_id}`,
        {
          username: username,
        }
      );

      console.log("Profil aktualizovaný", response.data);
      // Tu môžete pridať ďalšiu logiku, napr. presmerovanie alebo zobrazenie správy
    } catch (error) {
      console.error("Chyba pri aktualizácii profilu", error);
    }
    navigate("/profile");
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

            <Button variant="primary" type="submit" className="mt-3">
              Uložiť Zmeny
            </Button>

            <LinkButton to="/profile" variant="secondary" className="mt-3 ms-2">
              Zrušiť
            </LinkButton>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;
