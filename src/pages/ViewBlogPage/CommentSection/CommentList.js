import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCard from "../../../components/cards/CommentCard/CommentCard";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./CommentList.module.scss";
import { useAuth } from "../../../contexts/UserContext";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { getAccessToken } = useAuth();

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

  const handleDeleteComment = async (commentId) => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.delete(
        `http://localhost:3001/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //delete comment from state by filtering out the comment with the commentId
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
      console.log(response);
      console.log("Comment deleted:", response.data);
    } catch (error) {
      console.error("Error deleting comment:", error);
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
            authorId={comment.User.user_id}
            commentId={comment.comment_id}
            handleDeleteComment={handleDeleteComment}
          />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default CommentList;
