import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookJournalWhills } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <FontAwesomeIcon
            icon={faBookJournalWhills}
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          StarWars Reading List
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
