import React, { useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import Button from "../../components/buttons/Button";
import useResultMessage from "../../hooks/useResultMessage";
import PostForm from "../../components/PostForm";

const CreatePostPage = () => {
  const { getAccessToken } = useAuth();

  const [MessageComponent, successMessage, errorMessage] = useResultMessage();

  const handleSubmit = async ({ title, content, description }) => {
    if (!title.trim() || !content.trim()) {
      errorMessage("Prosím, vyplňte názov, popisok a obsah blogu.");
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
      successMessage(`Príspevok ${title} bol úspešne pridaný.`);
    } catch (error) {
      console.error("Chyba pri pridávaní príspevku:", error);
      errorMessage("Nepodarilo sa pridať príspevok. Skúste to znova.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <h1>Pridať Nový Blog</h1>

          {MessageComponent}

          <PostForm handleSubmitParent={handleSubmit}></PostForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostPage;
