import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../../components/buttons/Button";
import { MultiSelect } from "react-multi-select-component";

function FilterSection({ filterArticles }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [search, setSearch] = useState();

  const handleFetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      const updatedCategories = response.data.map((category) => ({
        label: category.name,
        value: category.category_id,
      }));

      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const valueRenderer = (selected) => {
    if (selected.length === 0) return "Vyberte kategórie";
    return selected.map((s) => s.label).join(", ");
  };

  return (
    <Row className="filter-section">
      <Col md={12}>
        <Form
          className="d-flex flex-column"
          onSubmit={(e) => e.preventDefault()}
        >
          <Form.Control
            type="text"
            placeholder="Hľadať článok"
            className="mb-1"
            onChange={(e) => setSearch(e.target.value)}
          />

          <MultiSelect
            options={categories}
            value={selected}
            onChange={setSelected}
            hasSelectAll={false}
            valueRenderer={valueRenderer}
            labelledBy="Vyberte kategórie"
          />
          <Form.Select
            className="mt-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Najnovšie</option>
            <option value="oldest">Najstaršie</option>
            <option value="recentlyUpdated">Nedávno aktualizované</option>
            <option value="leastRecentlyUpdated">
              Najmenej nedávno aktualizované
            </option>
            <option value="mostPopular">Najpopulárnejšie</option>
            <option value="leastPopular">Najmenej populárne</option>
          </Form.Select>
          <Button
            variant="primary"
            className="mt-1"
            onClick={() => {
              filterArticles(
                selected.map((category) => category.value),
                sortOrder,
                search
              );
            }}
          >
            Filtrovať
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FilterSection;
