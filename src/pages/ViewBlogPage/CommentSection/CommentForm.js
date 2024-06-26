import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./CommentForm.module.scss"; // Import štýlov
import { useAuth } from "../../../contexts/UserContext";
import axios from "axios";
import Button from "../../../components/buttons/Button";
import useResultMessage from "../../../hooks/useResultMessage";
import { useNavigate } from "react-router-dom";

const CommentForm = ({ postId, setReloadComments }) => {
  const [content, setContent] = useState("");
  const { isAuthenticated, getAccessToken } = useAuth();
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentData = {
      content,
    };

    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        `http://localhost:3001/posts/${postId}/comments`,
        commentData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setReloadComments((oldValue) => !oldValue);

      console.log("Comment created:", response.data);
      successMessage("Komentár bol úspešne pridaný.");

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
