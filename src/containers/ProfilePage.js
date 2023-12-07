import { useEffect, React } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import ProfileDetailsCard from "../components/ProfileDetailsCard";
import ChangePasswordCard from "../components/ChangePasswordCard";
import ChangeEmailCard from "../components/ChangeEmailCard";
import { useUser } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import useUserProfile from "../hooks/useUserProfile";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth0();
  const { loading, error, userProfile } = useUserProfile(user?.sub);
  const { saveUserProfile } = useUser();

  useEffect(() => {
    if (isAuthenticated && user && userProfile) {
      saveUserProfile(userProfile);
    }
  }, [user, isAuthenticated, saveUserProfile, userProfile]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <ProfileDetailsCard
            username={`${userProfile?.username}#${userProfile?.user_id}`}
            email={userProfile?.email}
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
