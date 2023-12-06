import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import HomePage from "./containers/HomePage";
import BlogPage from "./containers/BlogPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import CreatePostPage from "./containers/CreatePostPage";
import EditProfilePage from "./containers/EditProfilePage";
import LoginCallback from "./containers/LoginCallback";
import FinishSignupPage from "./containers/FinishSignupPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function Routing() {
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
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default Routing;