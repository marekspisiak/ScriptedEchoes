import React from "react";
import { Card } from "react-bootstrap";
import Button from "../../buttons/Button";
import styles from "./ArticleCard.module.scss";
import { Link } from "react-router-dom";
import { formatFullDate } from "../../../modules/formatDate";

function ArticleCard({ article, onDelete, userProfile, isAuthenticated }) {
  const handleDelete = (articleId) => {
    onDelete(articleId);
  };

  return (
    <Card className={`mb-4 ${styles.articleCard}`}>
      <Link to={`/blog/${article.post_id}`}>
        <Card.Img
          variant="top"
          src={article?.image ?? "/images/posts/default.jpg"}
          className={styles.articleCardImgTop}
        />
        <Card.Body>
          <Card.Title className={styles.articleCardTitle}>
            {article.title}
          </Card.Title>
          <Card.Text className={styles.articleCardText}>
            {article.description}
          </Card.Text>
          {article.Category?.name && (
            <Card.Text className={styles.articleCardText}>
              {article.Category?.name}
            </Card.Text>
          )}
        </Card.Body>
      </Link>
      <Card.Footer
        className={`d-flex justify-content-around align-items-center ${styles.articleCardTextMuted}`}
      >
        <small>{formatFullDate(article.created_at)}</small>
      </Card.Footer>
      {isAuthenticated && article?.author_id === userProfile?.user_id ? (
        <Button variant="danger" onClick={() => handleDelete(article.post_id)}>
          Vymazať
        </Button>
      ) : null}
    </Card>
  );
}

export default ArticleCard;
