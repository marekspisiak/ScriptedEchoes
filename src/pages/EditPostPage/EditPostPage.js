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
import { set } from "ramda";

const EditPostPage = () => {
  const { getAccessToken } = useAuth();
  const { blogId } = useParams();
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();

  const [data, setData] = useState(); // Nový stav pre obrázok

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
    image, // Pridaný obrázok ako nový parameter
    ...rest
  }) => {
    if (!title.trim() || !content.trim()) {
      errorMessage("Prosím, vyplňte názov, popisok a obsah blogu.");
      return;
    }

    try {
      const accessToken = await getAccessToken(); // Získanie access tokenu (predpokladá sa asynchrónna funkcia)

      // Vytvorenie objektu FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("description", description);
      if (category) formData.append("category", category);
      if (image) formData.append("image", image); // Pridanie obrázka len ak existuje
      Object.keys(rest).forEach((key) => {
        if (rest[key]) formData.append(key, rest[key]);
      });

      const response = await axios.patch(
        `http://localhost:3001/posts/${blogId}`,
        formData, // Použitie FormData namiesto obyčajného objektu
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Dôležité pre správne spracovanie FormData na serveri
          },
        }
      );

      console.log("Príspevok bol editovaný:", response.data);
      successMessage(`Príspevok ${title} bol úspešne editovaný.`);

      console.log(response.data);

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
      // Ošetrenie chyby, napríklad nastavenie stavu chyby alebo zobrazenie správy používateľovi
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
