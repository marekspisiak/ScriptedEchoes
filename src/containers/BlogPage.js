import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import BlogHeroSection from "../components/BlogHeroSection";
import FilterSection from "../components/FilterSection";
import Articles from "../components/Articles";
import Sidebar from "../components/Sidebar";

const BlogPage = () => {
  const latestArticles = [
    {
      title: "Najnovší článok 1",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "24.10.2023",
    },
    {
      title: "Najnovší článok 2",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "23.10.2023",
    },
    {
      title: "Najnovší článok 2",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "23.10.2023",
    },
    {
      title: "Najnovší článok 2",
      description: "Popis článku...",
      image: "/holder.jpg",
      date: "23.10.2023",
    },
  ];

  const sidebarData = {
    categories: [
      "Technológia",
      "Cestovanie",
      "Jedlo a pitie",
      "Umenie",
      "Osobný rast",
      "Zábava",
    ],
  };

  return (
    <>
      <Header />
      <Container fluid className="blog-container mt-5">
        <Row className="blog-hero-section mb-5">
          <Col>
            <BlogHeroSection />
          </Col>
        </Row>

        <Row className="content-section mb-5">
          <Col lg={3}>
            <FilterSection />
            <Sidebar categories={sidebarData.categories} />
          </Col>

          <Col lg={9}>
            <Articles articles={latestArticles} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default BlogPage;
