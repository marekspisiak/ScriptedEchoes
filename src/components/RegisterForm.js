import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <Form className="combined-form">
      <h1>Registrovať sa</h1>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Meno</Form.Label>
        <Form.Control size="lg" type="text" placeholder="Zadajte vaše meno" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Emailová adresa</Form.Label>
        <Form.Control size="lg" type="email" placeholder="Zadajte email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Heslo</Form.Label>
        <Form.Control size="lg" type="password" placeholder="Heslo" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
        <Form.Label>Potvrďte heslo</Form.Label>
        <Form.Control size="lg" type="password" placeholder="Potvrďte heslo" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrovať sa
      </Button>

      <div className="additional-actions">
        <Link to="/login">Máte už účet? Prihlásiť sa</Link>
      </div>
    </Form>
  );
}

export default RegisterForm;
