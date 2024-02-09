import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./CommentForm.module.scss"; // Import štýlov
import { useAuth } from "../../../contexts/UserContext";
import axios from "axios";
import Button from "../../../components/buttons/Button";
import useResultMessage from "../../../hooks/useResultMessage";

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");
  const { isAuthenticated, getAccessToken } = useAuth();
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Definujeme dáta pre odoslanie
    const commentData = {
      content,
    };

    try {
      // Použitie Axiosu na odoslanie POST požiadavky
      const accessToken = await getAccessToken();
      const response = await axios.post(
        `http://localhost:3001/posts/${postId}/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Pridajte ďalšie hlavičky, napríklad pre autorizáciu, ak je potrebné
          },
        }
      );

      // Po úspešnom odoslaniu
      console.log("Comment created:", response.data);
      successMessage("Komentár bol úspešne pridaný.");

      // Resetovanie stavu komponentu
      setContent("");
    } catch (error) {
      console.error("Error creating comment:", error);
      errorMessage("Nepodarilo sa pridať komentár.");
    }
  };

  return (
    isAuthenticated && (
      <>
        {ResultComponent}
        <Form onSubmit={handleSubmit} className={styles.commentForm}>
          <Form.Group controlId="commentContent">
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Napíšte váš komentár..."
              className={styles.textarea}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className={styles.submitButton}
          >
            Odoslať
          </Button>
        </Form>
      </>
    )
  );
};

export default CommentForm;
