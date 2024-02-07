import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogHeader from "./BlogHeader/BlogHeader"; // Predpokladá, že existuje komponent pre zobrazenie hlavičky blogu
import BlogContent from "./BlogContent/BlogContent"; // Predpokladá, že existuje komponent pre zobrazenie obsahu blogu
import BlogFooter from "./BlogFooter/BlogFooter"; // Predpokladá, že existuje komponent pre zobrazenie pätičky alebo metadát blogu
import { useParams } from "react-router-dom"; // Ak používate React Router pre navigáciu
import styles from "./ViewBlogPage.module.scss"; // SCSS moduly pre štýlovanie
import axios from "axios";

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
    return <div>Loading...</div>; // Zobrazenie načítavacieho stavu, kým sa dáta nenačítajú
  }

  return (
    <Container className={styles.viewBlogPage}>
      <Row>
        <Col>
          <BlogHeader title={blogData.title} author={blogData.author} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlogContent content={blogData.content} />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlogFooter date={blogData.date} />
        </Col>
      </Row>
      {/* Tu môžete pridať ďalšie komponenty, napríklad pre zobrazenie komentárov alebo súvisiacich článkov */}
    </Container>
  );
};

// Predpokladajúca funkcia na načítanie dát blogu - nahraďte skutočnou logikou načítania
async function fetchBlogData(blogId) {
  // Táto funkcia by mala vykonať HTTP požiadavku na API pre získanie dát blogu podľa ID
  // Vráťte simulované dáta alebo použite reálne API
  return {
    title: "Názov Blogu",
    author: "Autor Blogu",
    content: "Obsah blogu...",
    date: "Dátum Publikovania",
  };
}

export default ViewBlogPage;
