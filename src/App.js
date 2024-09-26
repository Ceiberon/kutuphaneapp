import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Publisher from "./pages/Publisher";
import Category from "./pages/Category";
import Book from "./pages/Book";
import Author from "./pages/Author";
import Purchase from "./pages/Purchase";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/publisher" element={<Publisher />} />
          <Route path="/category" element={<Category />} />
          <Route path="/book" element={<Book />} />
          <Route path="/author" element={<Author />} />
          <Route path="/purchase" element={<Purchase />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
