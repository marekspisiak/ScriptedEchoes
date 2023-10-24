import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./containers/HomePage";
import BlogPage from "./containers/BlogPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
