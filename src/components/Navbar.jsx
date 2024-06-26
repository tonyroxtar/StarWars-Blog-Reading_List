import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookJournalWhills, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleRemoveFavorites = (item) => {
    actions.removeFromFavorites(item);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a href="#" className="navbar-brand" onClick={handleLogoClick}>
          <FontAwesomeIcon
            icon={faBookJournalWhills}
            width="30"
            height="24"
            className="m-auto h1"
            alt="Logo"
          />
          <span className="h1"> StarWars Reading List</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <DropdownButton
                id="dropdown-menu-align-right"
                title="Menu"
                variant="secondary"
                align="end"
                >
                  <Dropdown.Header>Navigate</Dropdown.Header>
                  <Dropdown.Item onClick={() => handleNavigation("/characters")}>Characters</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleNavigation("/planets")}>Planets</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleNavigation("/ships")}>Ships</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Favorites</Dropdown.Header>
                  {store.favorites.length > 0 ? (
                    store.favorites.map((item, index) => (
                      <Dropdown.Item key={index} className="d-flex justify-content-between align-items-center">
                        <span onClick={() => handleNavigation(`/details/${item.type}/${item.uid}`)}>
                        {item.name}
                        </span>
                        <FontAwesomeIcon 
                        icon={faTrashAlt}
                        className="text-danger"
                        onClick={() => handleRemoveFavorites(item)}
                        style={{ cursor: "pointer" }}
                        />
                      </Dropdown.Item>  
                    ))
                  ) : (
                    <Dropdown.Item disabled>No Favorites</Dropdown.Item>
                  )}
                </DropdownButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
