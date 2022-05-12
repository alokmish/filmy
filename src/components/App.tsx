import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import TrendingPage from "../pages/TrendingPage";
import MoviesPage from "../pages/MoviesPage";
import ShowsPage from "../pages/ShowsPage";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/NotFoundPage";
import Modal from "./Modal";

const App = () => {
  return (
    <>
      <Router>
        <div className="app">
          <Nav></Nav>
          <div className="container">
            <Routes>
              <Route path="/" element={<TrendingPage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/shows" element={<ShowsPage />} />
              <Route path="/search/:type/:query" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
          <Modal />
        </div>
      </Router>
    </>
  );
};

export default App;
