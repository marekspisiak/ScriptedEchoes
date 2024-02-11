import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/UserContext";
import axios from "axios";
import Button from "../../components/buttons/Button";
import { useParams } from "react-router-dom";
import LinkButton from "../../components/buttons/LinkButton";
import PermissionDenied from "../../components/PermissionDenied";
import PostForm from "../../components/PostForm";
import useResultMessage from "../../hooks/useResultMessage";
import { useNavigate } from "react-router-dom";

const EditPostPage = () => {
  const { getAccessToken, user, isAuthenticated } = useAuth();
  const { blogId } = useParams();
  const [authorId, setAuthorId] = useState(null);
  const [ResultComponent, successMessage, errorMessage] = useResultMessage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(""); // Nový stav pre obrázok

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

  useEffect(() => {
    const fetchBlogData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setContent(response.data.content);
        setAuthorId(response.data.author_id);
        setCategory(response.data.category_id);
        setImage(response.data.image);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Ošetrenie chyby, napríklad nastavenie stavu chyby alebo zobrazenie správy používateľovi
      }
    };
    fetchBlogData(blogId);
  }, [blogId]);

  return isAuthenticated && authorId === user?.user_id ? (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={6}>
          <h1>Editovať blog</h1>
          {ResultComponent}
          <PostForm
            handleSubmitParent={handleSubmit}
            initialTitle={title}
            initialDescription={description}
            initialContent={content}
            initialCategory={category}
            initialImage={image}
            returnBack={returnBack}
          ></PostForm>
        </Col>
      </Row>
    </Container>
  ) : (
    PermissionDenied()
  );
};

export default EditPostPage;
