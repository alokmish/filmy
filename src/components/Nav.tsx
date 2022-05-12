import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdLocalPlay } from "react-icons/md";

const Nav = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let type = "";
    if (e.key === "Enter") {
      if (window.location.pathname.includes("movie")) {
        type = "movie";
      } else if (window.location.pathname.includes("shows")) {
        type = "tv";
      } else {
        type = "multi";
      }
      navigate(`/search/${type}/${query}`, { replace: true });
    }
  };
  const clearSearch = () => {
    setQuery("");
  };
  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      {/* navbar brand */}
      <div className="navbar-brand">
        <Link
          className="navbar-item"
          to="/"
          title="Filmy"
          onClick={clearSearch}
        >
          <span className="icon-text has-text-danger">
            <MdLocalPlay className="icon is-medium" />
            <h1 className="title is-4 is-family-primary">Filmy</h1>
          </span>
        </Link>
        <div
          role="button"
          title="Hamburger Menu"
          className={"navbar-burger " + (isActive ? "is-active" : "")}
          aria-label="menu"
          aria-expanded="false"
          data-target="filmyNavbar"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
      {/* navbar */}
      <div
        id="filmyNavbar"
        className={"navbar-menu " + (isActive ? "is-active" : "")}
      >
        <div className="navbar-start">
          <div title="Trending">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar-item is-active is-tab" : "navbar-item is-tab"
              }
              to="/"
              onClick={clearSearch}
            >
              Trending
            </NavLink>
          </div>
          <div title="Movies">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar-item is-active is-tab" : "navbar-item is-tab"
              }
              to="/movies"
              onClick={clearSearch}
            >
              Movies
            </NavLink>
          </div>
          <div title="TV Shows">
            <NavLink
              className={({ isActive }) =>
                isActive ? "navbar-item is-active is-tab" : "navbar-item is-tab"
              }
              to="/shows"
              onClick={clearSearch}
            >
              Shows
            </NavLink>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <input
              className="input is-link is-rounded is-small"
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleQueryChange}
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
