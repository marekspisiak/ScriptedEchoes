// components/FilterSection.jsx

import { Form, Row, Col } from "react-bootstrap";
import Button from "../../components/buttons/Button";

function FilterSection() {
  return (
    <Row className="filter-section">
      <Col md={12}>
        <Form className="d-flex">
          <Form.Control type="text" placeholder="Hľadať článok" />
          <Button variant="primary">Hľadať</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FilterSection;
