import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./containers/HomePage";
import BlogPage from "./containers/BlogPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ScrollToTop from "./ScrollToTop";

import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain="dev-lvx04gpir514yisr.us.auth0.com"
      clientId="jAs3G0RPYsvmlsnfF2XurxhRW8EI3uYf"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
