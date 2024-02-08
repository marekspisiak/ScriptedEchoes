import React, { useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import Button from "../../components/buttons/Button";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const { getAccessToken } = useAuth();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Prosím, vyplňte názov a obsah blogu.");
      return;
    }

    try {
      const accessToken = getAccessToken(); // Získanie access tokenu

      const response = await axios.post(
        "http://localhost:3001/posts",
        {
          title,
          content,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Posielanie access tokenu v hlavičke
          },
        }
      );

      console.log("Nový príspevok bol pridaný:", response.data);
      setMessage(`Príspevok ${title} bol úspešne pridaný.`);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Chyba pri pridávaní príspevku:", error);
      setError("Nepodarilo sa pridať príspevok. Skúste to znova.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Pridať Nový Blog</h1>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="blogTitle">
              <Form.Label>Názov</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zadajte názov blogu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="blogDescription">
              <Form.Label>Popisok</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zadajte popis blogu"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="blogContent">
              <Form.Label>Obsah</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Zadajte obsah blogu"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Button className="m-3" type="submit" variant={"primary"}>
              Pridať Blog
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostPage;
