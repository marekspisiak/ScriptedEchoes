import React from "react";
import { Card } from "react-bootstrap";
import Button from "../../buttons/Button";
import styles from "./ArticleCard.module.scss";
import { Link } from "react-router-dom";

function ArticleCard({ article, onDelete, userProfile }) {
  const handleDelete = (articleId) => {
    onDelete(articleId);
  };

  return (
    <Card className={`mb-4 ${styles.articleCard}`}>
      <Link to={`/blog/${article.post_id}`}>
        <Card.Img
          variant="top"
          src={article.image}
          className={styles.articleCardImgTop}
        />
        <Card.Body>
          <Card.Title className={styles.articleCardTitle}>
            {article.title}
          </Card.Title>
          <Card.Text className={styles.articleCardText}>
            {article.description}
          </Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer
        className={`d-flex justify-content-around align-items-center ${styles.articleCardTextMuted}`}
      >
        <small>{article.created_at}</small>
        {article?.author_id === userProfile?.user_id ? (
          <Button
            variant="danger"
            onClick={() => handleDelete(article.post_id)}
          >
            Delete
          </Button>
        ) : null}
      </Card.Footer>
    </Card>
  );
}

export default ArticleCard;
