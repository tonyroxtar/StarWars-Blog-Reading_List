import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import ImagePlaceholder from "../assets/SW_Placeholder.jpg";


const CardDetail = ({ type, id }) => {
  const { store, actions } = useContext(Context);
  const [details, setDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      let data;
      switch (type) {
        case "characters":
          data =
            store.characterDetails[id] ||
            (await actions.FetchCharacterDetails(id));
          setImageUrl(
            `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
          );
          break;
        case "planets":
          data =
            store.planetDetails[id] || (await actions.FetchPlanetDetails(id));
          setImageUrl(
            `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
          );
          break;
        case "ships":
          data = store.shipDetails[id] || (await actions.FetchShipDetails(id));
          setImageUrl(
            `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
          );
          break;
        default:
          break;
      }
      setDetails(data);
    };
    fetchDetails();
  }, [type, id, store, actions]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = ImagePlaceholder;
            }}
            className="img-fluid"
            alt={details.name || details.title}
          />
        </div>
        <div className="col-md-6">
          <h1>{details.name || details.title}</h1>
          <p>
            <strong>Type:</strong> {type}
          </p>
          <p>
            <strong>ID:</strong> {id}
          </p>
          {/* Add more details as needed */}
          {type === "characters" && (
            <>
              <p>
                <strong>Gender:</strong> {details.gender}
              </p>
              <p>
                <strong>Birth Year:</strong> {details.birth_year}
              </p>
              <p>
                <strong>Height:</strong> {details.height}
              </p>
              <p>
                <strong>Mass:</strong> {details.mass}
              </p>
              <p>
                <strong>Hair Color:</strong> {details.hair_color}
              </p>
              <p>
                <strong>Skin Color:</strong> {details.skin_color}
              </p>
            </>
          )}
          {type === "planets" && (
            <>
              <p>
                <strong>Climate:</strong> {details.climate}
              </p>
              <p>
                <strong>Diameter:</strong> {details.diameter}
              </p>
              <p>
                <strong>Gravity:</strong> {details.gravity}
              </p>
              <p>
                <strong>Population:</strong> {details.population}
              </p>
              <p>
                <strong>Terrain:</strong> {details.terrain}
              </p>
            </>
          )}
          {type === "ships" && (
            <>
              <p>
                <strong>Model:</strong> {details.model}
              </p>
              <p>
                <strong>Manufacturer:</strong> {details.manufacturer}
              </p>
              <p>
                <strong>Cost:</strong> {details.cost_in_credits}
              </p>
              <p>
                <strong>Length:</strong> {details.length}
              </p>
              <p>
                <strong>Max Speed:</strong> {details.max_atmosphering_speed}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

CardDetail.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardDetail;
