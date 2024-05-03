import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <Form className="combined-form">
      <h1>Prihlásiť sa</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Emailová adresa</Form.Label>
        <Form.Control size="lg" type="email" placeholder="Zadajte email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Heslo</Form.Label>
        <Form.Control size="lg" type="password" placeholder="Heslo" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Prihlásiť sa
      </Button>
      <div className="additional-actions">
        <Link to="/register">Registrovať sa</Link>
        <Link to="/forgot-password">Zabudli ste heslo?</Link>
      </div>
    </Form>
  );
}

export default LoginForm;
