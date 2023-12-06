import { useEffect, React } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileDetailsCard from "../components/ProfileDetailsCard";
import ChangePasswordCard from "../components/ChangePasswordCard";
import { useAuth0 } from "@auth0/auth0-react";
import useUserProfile from "../hooks/useUserProfile";

const ProfilePage = () => {
  const { user } = useAuth0();
  const { userProfile, loading, error } = useUserProfile(user.sub);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <ProfileDetailsCard
            username={userProfile?.username}
            email={userProfile?.email}
            isEditable={true} // Tlačidlo sa zobrazí
          />

          <ChangePasswordCard />

          <Card>
            <Card.Body>
              <Card.Title>Zmena E-mailu</Card.Title>
              <Card.Text>Aktualizujte váš kontaktný e-mail.</Card.Text>
              <Link to="/change-email" className="btn btn-secondary">
                Zmeniť E-mail
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
