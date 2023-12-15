import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";

import { useAuth } from "../../contexts/UserContext";

import styles from "./Header.module.scss";

const Header = () => {
  const { isAuthenticated } = useAuth();
  return (
    <header className={`${styles.header}`}>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className={styles.brand}>
            ScriptedEchoes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`${styles.headerBlock} me-auto`}>
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
            <Nav>
              {isAuthenticated ? (
                <Nav.Link as={Link} to="/profile">
                  Profil
                </Nav.Link>
              ) : (
                <></>
              )}
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <LogoutButton />
              ) : (
                <LoginButton variant={"secondary"} />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
