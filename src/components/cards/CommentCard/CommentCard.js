import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./CommentCard.module.scss"; // Import štýlov

const CommentCard = ({ author, content, createdAt }) => {
  return (
    <Card className={styles.commentCard}>
      <Card.Body>
        <Card.Title className={styles.commentAuthor}>{author}</Card.Title>
        <Card.Text className={styles.commentContent}>{content}</Card.Text>
        <Card.Text className={styles.commentCreatedAt}>{createdAt}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
