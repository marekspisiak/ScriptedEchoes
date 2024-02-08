import React from "react";
import Comment from "./Comment";
import styles from "./CommentList.module.scss";

const CommentList = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.author}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      ))}
    </div>
  );
};

export default CommentList;
