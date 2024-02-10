// components/FilterSection.jsx

import { Form, Row, Col } from "react-bootstrap";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

function FilterSection({ filterArticles }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleFetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      const updatedCategories = response.data.map((category) => ({
        label: category.name,
        value: category.category_id,
      }));

      setCategories(updatedCategories);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const valueRenderer = (selected) => {
    if (selected.length === 0) return "Vyberte kategórie";
    return selected.map((selected) => selected.label).join(", ");
  };

  return (
    <Row className="filter-section">
      <Col md={12}>
        <Form className="d-flex">
          <Form.Control type="text" placeholder="Hľadať článok" />
        </Form>
        <MultiSelect
          className="mt-1"
          options={categories}
          value={selected}
          onChange={setSelected}
          hasSelectAll={false}
          valueRenderer={valueRenderer}
        />
        <Button
          variant="primary"
          onClick={() => {
            filterArticles(selected.map((category) => category.value));
          }}
        >
          Filtrovať
        </Button>
      </Col>
    </Row>
  );
}

export default FilterSection;
