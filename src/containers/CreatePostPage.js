import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useUser } from "../contexts/UserContext";
import axios from "axios";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { userProfile } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/posts", {
        title,
        content,
        author_id: userProfile?.user_id,
      });

      console.log("Nový príspevok bol pridaný:", response.data);
      // Po úspešnom pridaní môžete presmerovať užívateľa alebo zobraziť správu
    } catch (error) {
      console.error("Chyba pri pridávaní príspevku:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Pridať Nový Blog</h1>
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

            <Button variant="primary" type="submit">
              Pridať Blog
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostPage;
