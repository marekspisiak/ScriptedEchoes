import React from "react";
import styles from "./CommentCard.module.scss"; // Import štýlov

const CommentCard = ({ author, content, createdAt }) => {
  return (
    <div className={styles.commentCard}>
      <h3 className={styles.commentAuthor}>{author}</h3>
      <p className={styles.commentContent}>{content}</p>
      <p className={styles.commentCreatedAt}>{createdAt}</p>
    </div>
  );
};

export default CommentCard;
