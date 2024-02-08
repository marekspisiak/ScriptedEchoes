import React from "react";
import CommentCard from "../../../components/cards/CommentCard/CommentCard";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./CommentList.module.scss"; // Predpokladajme, že tu máte definované CSS moduly

const CommentList = ({ comments }) => {
  return (
    <ListGroup className={styles.commentList}>
      {comments.map((comment) => (
        <ListGroup.Item key={comment.id} className={styles.commentListItem}>
          <CommentCard
            author={comment.author}
            content={comment.content}
            createdAt={comment.createdAt}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CommentList;
