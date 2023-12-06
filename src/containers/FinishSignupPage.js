import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FinishSignupPage = () => {
  return (
    <>
      <Header />
      <Container fluid className="login-container"></Container>
      <Footer />
    </>
  );
};

export default FinishSignupPage;
