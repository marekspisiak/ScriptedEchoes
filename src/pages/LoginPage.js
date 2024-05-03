import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const LoginPage = () => {
  return (
    <>
      <Container fluid className="login-container">
        <LoginForm />
      </Container>
    </>
  );
};

export default LoginPage;
