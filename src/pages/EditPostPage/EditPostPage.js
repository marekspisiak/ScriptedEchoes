import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import Button from "../../components/buttons/Button";
import { useParams } from "react-router-dom";
import LinkButton from "../../components/buttons/LinkButton";
import PermissionDenied from "../../components/PermissionDenied";
import PostForm from "../../components/PostForm";
import useResultMessage from "../../hooks/useResultMessage";

const EditPostPage = () => {
  const { getAccessToken, user } = useAuth();
  const { blogId } = useParams();
  const [authorId, setAuthorId] = useState(null);
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async ({ title, content, description }) => {
    if (!title.trim() || !content.trim()) {
      errorMessage("Prosím, vyplňte názov, popisok a obsah blogu.");
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
      successMessage(`Príspevok ${title} bol úspešne editovaný.`);
    } catch (error) {
      console.error("Chyba pri editovaní príspevku:", error);
      errorMessage("Nepodarilo sa editovať príspevok. Skúste to znova.");
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

  return authorId === user.user_id ? (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={6}>
          <h1>Editovať blog</h1>
          {ResultComponent}
          <PostForm
            handleSubmitParent={handleSubmit}
            initialTitle={title}
            initialDescription={description}
            initialContent={content}
          ></PostForm>
        </Col>
      </Row>
    </Container>
  ) : (
    PermissionDenied()
  );
};

export default EditPostPage;
