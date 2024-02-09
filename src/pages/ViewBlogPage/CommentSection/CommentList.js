import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCard from "../../../components/cards/CommentCard/CommentCard";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./CommentList.module.scss";
import { useAuth } from "../../../contexts/UserContext";
import { set } from "date-fns";

const CommentList = ({ postId }) => {
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { getAccessToken } = useAuth();
  const [comments, setComments] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  console.log(comments.length);

  const fetchComments = async () => {
    try {
      console.log("current page" + currentPage);
      const response = await axios.get(
        `http://localhost:3001/posts/${postId}/comments`,
        {
          params: { page: currentPage, limit: 10 },
        }
      );

      console.log("mam odpoved", response.data.comments);

      // Pridá nové komentáre k existujúcim
      setComments((prevComments) => [
        ...prevComments,
        ...response.data.comments,
      ]);
      setCurrentPage((prevPage) => prevPage + 1);

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

  const handleInitialLoad = async () => {
    await fetchComments();
    setInitialLoad(false);
  };

  useEffect(() => {
    handleInitialLoad();
  }, [postId]);

  if (initialLoad) {
    return <h4>Loading...</h4>;
  }

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
