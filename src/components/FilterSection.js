// components/FilterSection.jsx

import { Form, Button, Row, Col } from "react-bootstrap";

function FilterSection() {
  return (
    <Row className="filter-section">
      <Col md={12}>
        <Form className="d-flex">
          <Form.Control type="text" placeholder="Hľadať článok" />
          <Button variant="outline-primary">Hľadať</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FilterSection;