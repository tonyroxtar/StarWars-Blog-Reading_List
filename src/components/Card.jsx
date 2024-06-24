import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImagePlaceholder from '../assets/SW_Placeholder.jpg';

const Card = ({ title, description, imageUrl }) => {
  // Verificar si la URL de la imagen es válida
  const isValidImageUrl = (url) => {
    const img = new Image();
    img.src = url;
    return img.height !== 0;
  };

  const imageSrc = imageUrl && isValidImageUrl(imageUrl) ? imageUrl : ImagePlaceholder;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={imageSrc} className="card-img-top" alt="Card image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {description}
        </p>
        <div className="d-flex justify-content-between">
          <a href="#" className="btn btn-secondary">
            Learn More!
          </a>
          <button className="btn btn-secondary" aria-label="Add to favorites">
            <FontAwesomeIcon icon={faGalacticRepublic} />
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string
};

export default Card;
