import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogHeader from "./BlogHeader/BlogHeader";
import BlogContent from "./BlogContent/BlogContent";
import BlogFooter from "./BlogFooter/BlogFooter";
import { useParams } from "react-router-dom";
import styles from "./ViewBlogPage.module.scss";
import axios from "axios";
import EditBlog from "./EditBlog";
import Loading from "../../components/Loading";
import CommentForm from "./CommentSection/CommentForm";
import CommentList from "./CommentSection/CommentList";

const ViewBlogPage = () => {
  const [blogData, setBlogData] = useState(null);
  const [reloadComments, setReloadComments] = useState(false);

  const { blogId } = useParams();

  useEffect(() => {
    const fetchBlogData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    if (blogId) {
      fetchBlogData(blogId);
    }
  }, [blogId]);

  if (!blogData) {
    return <Loading />;
  }

  return (
    <Container className={styles.viewBlogPage}>
      <Row>
        <Col>
          <BlogHeader
            title={blogData.title}
            author={blogData.User.username}
            image={blogData.image}
            description={blogData.description}
          />
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
            updateDate={blogData.updated_at}
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
          <CommentForm
            postId={blogData.post_id}
            setReloadComments={setReloadComments}
          ></CommentForm>
        </Col>
      </Row>
      <Row>
        <Col className="mg-5">
          <CommentList
            postId={blogData.post_id}
            key={reloadComments}
          ></CommentList>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewBlogPage;
