import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogHeader from "./BlogHeader/BlogHeader"; // Predpokladá, že existuje komponent pre zobrazenie hlavičky blogu
import BlogContent from "./BlogContent/BlogContent"; // Predpokladá, že existuje komponent pre zobrazenie obsahu blogu
import BlogFooter from "./BlogFooter/BlogFooter"; // Predpokladá, že existuje komponent pre zobrazenie pätičky alebo metadát blogu
import { useParams } from "react-router-dom"; // Ak používate React Router pre navigáciu
import styles from "./ViewBlogPage.module.scss"; // SCSS moduly pre štýlovanie
import axios from "axios";
import EditBlog from "./EditBlog";
import Loading from "../../components/Loading";
import CommentForm from "./CommentSection/CommentForm";
import CommentList from "./CommentSection/CommentList";

const ViewBlogPage = () => {
  const [blogData, setBlogData] = useState(null);

  const { blogId } = useParams(); // Získanie ID blogu z URL, ak používate React Router

  useEffect(() => {
    const fetchBlogData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        // Ošetrenie chyby, napríklad nastavenie stavu chyby alebo zobrazenie správy používateľovi
      }
    };

    if (blogId) {
      fetchBlogData(blogId);
    }
  }, [blogId]); // Závislosť na blogId zaručí, že useEffect bu

  if (!blogData) {
    return <Loading />; // Zobrazenie načítavacieho stavu, kým sa dáta nenačítajú
  }

  const comments = [
    { author: "Patrik", content: "Super článok!" },
    { author: "Janko", content: "Nesúhlasím s tvojím názorom." },
  ];

  return (
    <Container className={styles.viewBlogPage}>
      <Row>
        <Col>
          <BlogHeader title={blogData.title} author={blogData.User.username} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlogContent content={blogData.content} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlogFooter
            creationDate={blogData.created_at}
            updateDate={blogData.updateDate}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <EditBlog author_id={blogData.author_id} post_id={blogData.post_id} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Komentáre</h2>
        </Col>
      </Row>
      <Row>
        <Col className="mg-5">
          <CommentForm></CommentForm>
        </Col>
      </Row>
      <Row>
        <Col className="mg-5">
          <CommentList comments={comments}></CommentList>
        </Col>
      </Row>
      {/* Tu môžete pridať ďalšie komponenty, napríklad pre zobrazenie komentárov alebo súvisiacich článkov */}
    </Container>
  );
};

export default ViewBlogPage;
