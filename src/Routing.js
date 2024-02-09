import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginCallback from "./pages/LoginCallbackPage";
import FinishSignupPage from "./pages/FinishSignupPage";
import ProfilePage from "./pages/ProfilePage";
import ViewBlogPage from "./pages/ViewBlogPage";
import EditPostPage from "./pages/EditPostPage";

import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Routing() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:blogId" element={<ViewBlogPage />} />
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
            path="/blog/:blogId/edit"
            element={
              <ProtectedRoute
                path="/blog/:blogId/edit"
                component={EditPostPage}
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
