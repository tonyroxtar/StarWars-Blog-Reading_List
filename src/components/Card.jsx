import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGalacticRepublic } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import ImagePlaceholder from "../assets/SW_Placeholder.jpg";
import { Context } from "../store/appContext";

const Card = ({ title, description, imageUrl, item }) => {
  const { actions } = useContext(Context);
  const imageSrc = imageUrl ? imageUrl : ImagePlaceholder;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imageSrc} className="card-img-top" alt="Card image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <a href="#" className="btn btn-secondary">
            Learn More!
          </a>
          <button
            className="btn btn-secondary"
            aria-label="Add to favorites"
            onClick={() => actions.addToFavorites(item)}
          >
            <FontAwesomeIcon icon={faGalacticRepublic} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
