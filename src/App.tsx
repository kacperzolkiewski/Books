import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { TopBar } from "./components/TopBar/TopBar";
import { Favourite } from "./pages/favourite/Favourite";
import { fetchBooks } from "./apiCalls";
import { useContext, useEffect, useState } from "react";
import { BookContext } from "./context/BookContext/BookContext";
import { Filter } from "./components/Filter/Filter";
import { Search } from "./pages/search/Search";

function App() {
  const { dispatch } = useContext(BookContext);
  const [show, setShow] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleShowChange = () => setShow(!show);
  const handleAuthorChange = (value: string) => setAuthor(value);
  const handleTitleChange = (value: string) => setTitle(value);

  useEffect(() => {
    fetchBooks(dispatch);
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <TopBar showChange={handleShowChange} />
        <Filter
          show={show}
          authorChange={handleAuthorChange}
          titleChange={handleTitleChange}
        />
        <Routes>
          <Route path="/" element={<Home author={author} title={title} />} />
          <Route
            path="/favourite"
            element={<Favourite author={author} title={title} />}
          />
          <Route
            path="/search"
            element={<Search author={author} title={title} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
