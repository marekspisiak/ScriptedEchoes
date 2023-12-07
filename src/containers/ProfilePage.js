import { useEffect, React } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ProfileDetailsCard from "../components/ProfileDetailsCard";
import ChangePasswordCard from "../components/ChangePasswordCard";
import ChangeEmailCard from "../components/ChangeEmailCard";
import { useUser } from "../contexts/UserContext";

const ProfilePage = () => {
  const { userProfile } = useUser();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <ProfileDetailsCard
            username={`${userProfile?.username}#${userProfile?.user_id}`}
            email={userProfile?.email}
            isEditable={true} // Tlačidlo sa zobrazí
          />

          <ChangePasswordCard />

          <ChangeEmailCard />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
