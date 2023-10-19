import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./containers/HomePage";
import BlogPage from "./containers/BlogPage";
import HomeLogo from "./components/HomeLogo";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ... ďalšie importy ...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        {/* ... ďalšie trasy ... */}
      </Routes>
    </Router>
  );
}

export default App;
