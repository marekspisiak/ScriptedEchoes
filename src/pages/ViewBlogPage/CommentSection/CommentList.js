import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCard from "../../../components/cards/CommentCard/CommentCard";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import styles from "./CommentList.module.scss";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Predpokladáme, že API poskytuje informáciu o celkovom počte strán

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/${postId}/comments`,
          {
            params: { page: currentPage, limit: 10 },
          }
        );
        setComments(response.data.comments); // Aktualizujte podľa formátu vašej odpovede
        setTotalPages(response.data.totalPages); // Aktualizujte podľa formátu vašej odpovede
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId, currentPage]);

  console.log(comments);
  // Funkcia na zmenu stránky
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <ListGroup className={styles.commentList}>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id} className={styles.commentListItem}>
            <CommentCard
              author={`${comment.User.username}#${comment.User.user_id}`} // Upravte podľa štruktúry dát
              content={comment.content}
              createdAt={comment.created_at}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className={styles.pagination}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Predchádzajúca
        </Button>
        <span>
          {" "}
          Strana {currentPage} z {totalPages}{" "}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Ďalšia
        </Button>
      </div>
    </div>
  );
};

export default CommentList;
