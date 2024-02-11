import React from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../contexts/UserContext";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";

const EditBlog = ({ author_id, post_id }) => {
  const { getAccessToken, user } = useAuth();
  const navigate = useNavigate();

  const deleteArticle = async (articleId) => {
    try {
      const accessToken = await getAccessToken();
      await axios.delete(`http://localhost:3001/posts/${articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      navigate("/blog");
    } catch (error) {
      console.error("Chyba pri odstraňovaní článku:", error);
    }
  };

  const editArticle = () => {
    navigate(`/blog/${post_id}/edit`);
  };

  return (
    <Row>
      <Col>
        {author_id === user?.user_id ? (
          <>
            <Button variant="primary" onClick={() => editArticle()}>
              Editovať
            </Button>
            <Button variant="danger" onClick={() => deleteArticle(post_id)}>
              Vymazať
            </Button>
          </>
        ) : null}
      </Col>
    </Row>
  );
};

export default EditBlog;
