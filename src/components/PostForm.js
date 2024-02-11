// PostForm.jsx
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./PostForm.module.scss"; // Uistite sa, že ste vytvorili tento SCSS modul
import Button from "./buttons/Button";

const PostForm = ({ handleSubmitParent, data, returnBack }) => {
  console.log(data);
  const [title, setTitle] = useState(data?.title || "");
  const [content, setContent] = useState(data?.content || "");
  const [description, setDescription] = useState(data?.description || "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(data?.category_id || "");
  const [image, setImage] = useState(data?.image || null);

  const lengthLimits = {
    title: 20,
    description: 45,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { title, content, description, category, image };
    await handleSubmitParent(data);
  };

  const handleFetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  return (
    <Form onSubmit={handleSubmit} className={styles.formContainer}>
      <Form.Group controlId="blogTitle" className={styles.formGroup}>
        <Form.Label className={styles.label}>Názov</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte názov blogu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={lengthLimits.title}
          className={styles.input}
        />
        <Form.Text className={styles.formText}>
          Zostáva {lengthLimits.title - title.length} znakov
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="blogDescription" className={styles.formGroup}>
        <Form.Label className={styles.label}>Popisok</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte popis blogu"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={lengthLimits.description}
          className={styles.input}
        />
        <Form.Text className={styles.formText}>
          Zostáva {lengthLimits.description - description.length} znakov
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="blogCategory" className={styles.formGroup}>
        <Form.Label className={styles.label}>Kategória</Form.Label>
        <Form.Select
          value={category || ""}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
        >
          <option value="">Vyberte kategóriu</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="blogContent" className={styles.formGroup}>
        <Form.Label className={styles.label}>Obsah</Form.Label>
        <ReactQuill
          value={content}
          onChange={setContent}
          className={styles.quill}
        />
      </Form.Group>

      <Form.Group controlId="blogImage" className={styles.formGroup}>
        <Form.Label className={styles.label}>Náhľadový obrázok</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className={styles.fileInput}
        />
      </Form.Group>

      <Button type="submit" className={styles.button} variant={"primary"}>
        Potvrdit
      </Button>
      <Button
        type="button"
        className={styles.buttonReturn}
        variant={"secondary"}
        onClick={returnBack}
      >
        Zrušiť
      </Button>
    </Form>
  );
};

export default PostForm;
