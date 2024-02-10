import React, { useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import useResultMessage from "../../hooks/useResultMessage";
import PostForm from "../../components/PostForm";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const { getAccessToken } = useAuth();
  let navigate = useNavigate();

  const [MessageComponent, successMessage, errorMessage] = useResultMessage();

  const returnBack = () => {
    navigate(`/blog`);
  };

  const handleSubmit = async ({
    title,
    content,
    description,
    category,
    image,
    ...rest
  }) => {
    if (!title.trim() || !content.trim()) {
      errorMessage("Prosím, vyplňte názov, popisok a obsah blogu.");
      return;
    }

    try {
      const accessToken = getAccessToken(); // Získanie access tokenu

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("description", description);
      if (category) formData.append("category", category);
      if (image) formData.append("image", image); // Pridanie obrázka len ak existuje
      Object.keys(rest).forEach((key) => {
        if (rest[key]) formData.append(key, rest[key]);
      });

      const response = await axios.post(
        "http://localhost:3001/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Posielanie access tokenu v hlavičke
          },
        }
      );

      console.log("Nový príspevok bol pridaný:", response.data);
      successMessage(`Príspevok ${title} bol úspešne pridaný.`);
      //presmerovanie na prispevok
      navigate(`/blog/${response.data.post_id}`);
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

          <PostForm
            handleSubmitParent={handleSubmit}
            returnBack={returnBack}
          ></PostForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePostPage;
