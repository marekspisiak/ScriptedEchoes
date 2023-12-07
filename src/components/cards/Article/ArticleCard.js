import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Button from "../../buttons/Button";

function ArticleCard({ article, onDelete, userProfile }) {
  const handleDelete = (articleId) => {
    onDelete(articleId);
  };

  return (
    <Card className="mb-4 article-card">
      <Card.Img variant="top" src={article.image} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Text>{article.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around align-items-center">
        <small className="text-muted">{article.created_at}</small>
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
