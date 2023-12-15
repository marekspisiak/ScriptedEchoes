import { useEffect, React } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ProfileDetailsCard from "../../components/cards/ProfileDetailsCard";
import { useAuth } from "../../contexts/UserContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <ProfileDetailsCard
            username={`${user?.username}#${user?.user_id}`}
            email={user?.email}
            isEditable={true}
          />

          {/* <ChangePasswordCard />

          <ChangeEmailCard /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
