import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import Button from "../../components/buttons/Button";
import { useParams } from "react-router-dom";
import LinkButton from "../../components/buttons/LinkButton";
import PermissionDenied from "../../components/PermissionDenied";

const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const { getAccessToken, user } = useAuth();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { blogId } = useParams();
  const [authorId, setAuthorId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Prosím, vyplňte názov, popisok a obsah blogu.");
      return;
    }

    try {
      const accessToken = getAccessToken(); // Získanie access tokenu

      const response = await axios.patch(
        "http://localhost:3001/posts/" + blogId,
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

      console.log("Príspevok bol editovaný:", response.data);
      setMessage(`Príspevok ${title} bol úspešne editovaný.`);
      setTitle("");
      setDescription("");
      setContent("");
    } catch (error) {
      console.error("Chyba pri editovaní príspevku:", error);
      setError("Nepodarilo sa editovať príspevok. Skúste to znova.");
    }
  };

  useEffect(() => {
    const fetchBlogData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setContent(response.data.content);
        setAuthorId(response.data.author_id);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Ošetrenie chyby, napríklad nastavenie stavu chyby alebo zobrazenie správy používateľovi
      }
    };
    fetchBlogData(blogId);
  }, [blogId]);

  const lengthLimits = {
    title: 20,
    description: 45,
  };

  return authorId === user.user_id ? (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Editovať blog</h1>

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
                maxLength={lengthLimits.title}
              />
              <Form.Text>
                Zostáva {lengthLimits.title - title.length} znakov
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="blogDescription">
              <Form.Label>Popisok</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zadajte popis blogu"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={lengthLimits.description}
              />
              <Form.Text>
                Zostáva {lengthLimits.description - description.length} znakov
              </Form.Text>
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
              Uložiť zmeny
            </Button>
            <LinkButton
              className="m-3"
              variant={"secondary"}
              to={`/blog/${blogId}`}
            >
              Zahodiť zmeny
            </LinkButton>
          </Form>
        </Col>
      </Row>
    </Container>
  ) : (
    PermissionDenied()
  );
};

export default EditPostPage;
