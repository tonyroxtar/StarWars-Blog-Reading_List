import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookJournalWhills } from "@fortawesome/free-solid-svg-icons";
import Favorites from "./Favorites"; // Importa el componente de Favoritos

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a href="#" className="navbar-brand">
          <FontAwesomeIcon
            icon={faBookJournalWhills}
            width="30"
            height="24"
            className="me-2"
            alt="Logo"
          />
          StarWars Reading List
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
              <Favorites />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
