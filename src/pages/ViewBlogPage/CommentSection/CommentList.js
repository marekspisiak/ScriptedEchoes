import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCard from "../../../components/cards/CommentCard/CommentCard";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./CommentList.module.scss";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/posts/${postId}/comments`,
        {
          params: { page: currentPage, limit: 10 },
        }
      );

      // Pridá nové komentáre k existujúcim
      setComments((prevComments) => [
        ...prevComments,
        ...response.data.comments,
      ]);
      setCurrentPage((prevPage) => prevPage + 1);

      // Kontrola, či sme načítali všetky komentáre
      console.log(response.data.comments.length);
      if (
        response.data.comments.length === 0 ||
        response.data.comments.length < 10
      ) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchComments(); // Počiatočné načítanie komentárov
  }, [postId]);

  return (
    <InfiniteScroll
      dataLength={comments.length}
      next={fetchComments}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Koniec komentárov</b>
        </p>
      }
      className={styles.commentList}
    >
      {comments.map((comment) => (
        <div key={comment.comment_id} className={styles.commentListItem}>
          <CommentCard
            author={`${comment.User.username}#${comment.User.user_id}`}
            content={comment.content}
            createdAt={comment.created_at}
          />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default CommentList;
