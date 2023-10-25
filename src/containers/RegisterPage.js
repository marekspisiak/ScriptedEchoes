import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

const LoginPage = () => {
  return (
    <>
      <Header />
      <Container fluid className="login-container">
        <RegisterForm />
      </Container>
      <Footer />
    </>
  );
};

export default LoginPage;
