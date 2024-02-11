import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "./CommentCard.module.scss"; // Import štýlov
import Button from "../../buttons/Button";
import { useAuth } from "../../../contexts/UserContext";
import axios from "axios";
import useResultMessage from "../../../hooks/useResultMessage";
import { formatFullDate } from "../../../modules/formatDate";

const CommentCard = ({
  author,
  content,
  createdAt,
  authorId,
  commentId,
  handleDeleteComment,
  image,
}) => {
  const { getAccessToken, isAuthenticated, user } = useAuth();
  const [content2, setContent2] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();

  const handleUpadateComment = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.patch(
        `http://localhost:3001/comments/${commentId}`,
        { content: content2 },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Comment updated:", response.data);
      successMessage("Komentár bol úspešne upravený.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating comment:", error);
      errorMessage("Nepodarilo sa upraviť komentár.");
    }
  };

  return (
    <Card className={styles.commentCard}>
      <Card.Body className={styles.cardBody}>
        {
          <div className={styles.imageWrapper}>
            <img
              src={user?.image}
              alt="Profilový obrázok"
              className={styles.commentImage}
            />
          </div>
        }
        <div className={styles.textWrapper}>
          {ResultComponent}
          <Card.Title className={styles.commentAuthor}>{author}</Card.Title>
          <Card.Text className={styles.commentContent}>
            {isEditing ? (
              <textarea
                className={styles.commentTextarea}
                value={content2}
                onChange={(e) => setContent2(e.target.value)}
              />
            ) : (
              content2
            )}
          </Card.Text>
          <Card.Text className={styles.commentCreatedAt}>
            {formatFullDate(createdAt)}
          </Card.Text>
          {isAuthenticated && user.user_id === authorId && (
            <>
              {isEditing ? (
                <>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleUpadateComment();
                    }}
                  >
                    Uložiť
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeleteComment(commentId);
                    }}
                  >
                    Vymazať
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setContent2(content);
                      setIsEditing(false);
                    }}
                  >
                    Zrušiť
                  </Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Editovať
                </Button>
              )}
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CommentCard;
