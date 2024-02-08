import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./CommentForm.module.scss"; // Import štýlov

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
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
      <Button variant="primary" type="submit" className={styles.submitButton}>
        Odoslať
      </Button>
    </Form>
  );
};

export default CommentForm;
