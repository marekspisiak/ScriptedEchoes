import React from "react";
import { Card } from "react-bootstrap";
import Button from "../../buttons/Button";
import styles from "./ArticleCard.module.scss";
import { Link } from "react-router-dom";
import { formatFullDate } from "../../../modules/formatDate";
import usePermission from "../../../hooks/usePermission";
import { useNavigate } from "react-router-dom";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

function ArticleCard({ article, onDelete, userProfile, showOptions = false }) {
  const navigate = useNavigate();

  const canEdit = usePermission({
    requiredPermissions: ["edit:post"],
    requiredUserId: article.author_id,
  });

  const handleDelete = (articleId) => {
    onDelete(articleId);
  };

  return (
    <Card className={`mb-4 ${styles.articleCard}`}>
      <Link to={`/blog/${article.post_id}`}>
        <Card.Img
          variant="top"
          src={article?.image}
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
              <Tooltip title={article.Category?.description} position="bottom">
                {article.Category?.name}
              </Tooltip>
            </Card.Text>
          )}
        </Card.Body>
      </Link>
      <Card.Footer
        className={`d-flex justify-content-around align-items-center ${styles.articleCardTextMuted}`}
      >
        <small>{formatFullDate(article.created_at)}</small>
      </Card.Footer>
      {canEdit && showOptions ? (
        <>
          <Button
            variant="primary"
            onClick={() => navigate(`/blog/${article.post_id}/edit`)}
          >
            Editovať
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(article.post_id)}
          >
            Vymazať
          </Button>
        </>
      ) : null}
    </Card>
  );
}

export default ArticleCard;
