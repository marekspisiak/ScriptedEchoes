import React, { useEffect, useState } from "react";
import { Form, Container, Row, Col, Alert } from "react-bootstrap";
import Button from "./buttons/Button";
import axios from "axios";

const PostForm = ({
  handleSubmitParent,
  initialTitle = "",
  initialContent = "",
  initialDescription = "",
  initialCategory = "",
  initialImage = "", // Pridaná nová inicializačná hodnota pre obrázok, ak je to potrebné
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [description, setDescription] = useState(initialDescription);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [image, setImage] = useState(initialImage); // Stav pre uchovanie nahraného obrázka

  const lengthLimits = {
    title: 20,
    description: 45,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Pripravíme dáta pre odoslanie, vrátane nahraného obrázka
    const data = { title, content, description, category, image };

    await handleSubmitParent(data); // Zmena na odosielanie FormData objektu
    // setTitle("");
    // setContent("");
    // setDescription("");
    // setCategory("");
    // setImage(""); // Reset stavu obrázka
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
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Form.Group controlId="blogTitle">
        <Form.Label>Názov</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte názov blogu"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={lengthLimits.title}
        />
        <Form.Text>
          Zostáva {lengthLimits.title - title.length} znakov
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="blogDescription">
        <Form.Label>Popisok</Form.Label>
        <Form.Control
          type="text"
          placeholder="Zadajte popis blogu"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={lengthLimits.description}
        />
        <Form.Text>
          Zostáva {lengthLimits.description - description.length} znakov
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="blogCategory">
        <Form.Label>Kategória</Form.Label>
        <Form.Select
          value={category || ""}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Vyberte kategóriu</option>
          {categories &&
            categories.map((category) => (
              <option
                key={category.category_id}
                value={category.category_id || ""}
              >
                {category.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="blogContent">
        <Form.Label>Obsah</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Zadajte obsah blogu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="blogImage">
        <Form.Label>Náhľadový obrázok</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>

      <Button className={"mt-2"} type="submit" variant={"primary"}>
        Potvrdit
      </Button>
    </Form>
  );
};

export default PostForm;
