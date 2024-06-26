import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGalacticRepublic } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImagePlaceholder from '../assets/SW_Placeholder.jpg';
import { Context } from '../store/appContext';

const Card = ({ title, description, imageUrl, item, type }) => {
  const { actions } = useContext(Context);
  const [validImageUrl, setValidImageUrl] = useState(imageUrl);
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/details/${type}/${item.uid}`);
  };

  useEffect(() => {
    const checkImage = (url) => {
      const img = new Image();
      img.onload = () => setValidImageUrl(url);
      img.onerror = () => setValidImageUrl(ImagePlaceholder);
      img.src = url;
    };

    checkImage(imageUrl);
  }, [imageUrl]);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={validImageUrl} className="card-img-top" alt="Card image" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <a href="#" className="btn btn-secondary" onClick={handleLearnMore}>
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
