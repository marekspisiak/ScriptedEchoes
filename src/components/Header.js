import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import LoginButton from "./buttons/LoginButton";
import LogoutButton from "./buttons/LogoutButton";

import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar expand="lg" className="header-component">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ScriptedEchoes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Domov
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              O nás
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Kontakt
            </Nav.Link>
          </Nav>
          <Nav>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
