import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginCallback from "./pages/LoginCallbackPage";
import FinishSignupPage from "./pages/FinishSignupPage";
import ProfilePage from "./pages/ProfilePage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useUser } from "./contexts/UserContext";
import useUserProfile from "./hooks/useUserProfile";
import { useEffect } from "react";

function Routing() {
  const { user, isAuthenticated } = useAuth0();
  const { loading, error, userProfile } = useUserProfile(user?.sub);
  const { saveUserProfile } = useUser();

  useEffect(() => {
    if (isAuthenticated && user && userProfile) {
      saveUserProfile(userProfile);
    }
  }, [user, isAuthenticated, saveUserProfile, userProfile]);

  return (
    <Router>
      <ScrollToTop />
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute path="/create" component={CreatePostPage} />
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute
                path="/edit-profile"
                component={EditProfilePage}
              />
            }
          />
          <Route
            path="/login-callback"
            element={
              <ProtectedRoute
                path="/login-callback"
                component={LoginCallback}
              />
            }
          />
          <Route
            path="/finish-signup"
            element={
              <ProtectedRoute
                path="/finish-signup"
                component={FinishSignupPage}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute path="/profile" component={ProfilePage} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default Routing;
