import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import PermissionDenied from "../../components/PermissionDenied";
import PostForm from "../../components/PostForm";
import useResultMessage from "../../hooks/useResultMessage";
import { useNavigate } from "react-router-dom";
import usePermission from "../../hooks/usePermission";

const EditPostPage = () => {
  const { getAccessToken } = useAuth();
  const { blogId } = useParams();
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();

  const [data, setData] = useState();

  const canEdit = usePermission({
    requiredPermissions: ["edit:post"],
    requiredUserId: data?.author_id,
  });

  const navigate = useNavigate();

  const returnBack = () => {
    navigate(`/blog/${blogId}`);
  };

  const handleSubmit = async ({
    title,
    content,
    description,
    category,
    image,
    ...rest
  }) => {
    if (!title.trim() || !content.trim()) {
      errorMessage("Prosím, vyplňte názov, popisok a obsah blogu.");
      return;
    }

    try {
      const accessToken = await getAccessToken();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("description", description);
      if (category) formData.append("category", category);
      if (image) formData.append("image", image);
      Object.keys(rest).forEach((key) => {
        if (rest[key]) formData.append(key, rest[key]);
      });

      const response = await axios.patch(
        `http://localhost:3001/posts/${blogId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Príspevok bol editovaný:", response.data);
      successMessage(`Príspevok ${title} bol úspešne editovaný.`);

      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error("Chyba pri editovaní príspevku:", error);
      errorMessage("Nepodarilo sa editovať príspevok. Skúste to znova.");
    }
  };

  const fetchBlogData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/${id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData(blogId);
  }, [blogId]);

  return canEdit ? (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={6}>
          <h1>Editovať blog</h1>
          {ResultComponent}
          {data && (
            <PostForm
              handleSubmitParent={handleSubmit}
              data={data}
              returnBack={returnBack}
            ></PostForm>
          )}
        </Col>
      </Row>
    </Container>
  ) : (
    PermissionDenied()
  );
};

export default EditPostPage;
