// components/FilterSection.jsx

import { Form, Button, Row, Col } from "react-bootstrap";

function FilterSection() {
  return (
    <Row className="filter-section">
      <Col md={12}>
        <Form inline>
          <Form.Control
            type="text"
            placeholder="Hľadať článok"
            className="mr-sm-2"
          />
          {/* ... môžete pridať ďalšie polia na filtrovanie, napr. podľa kategórie, dátumu, atď. */}
          <Button variant="outline-primary">Hľadať</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FilterSection;
