import React, { useEffect, useContext } from "react";
import Card from "../components/Card";
import { Context } from "../store/appContext";

const Planets = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.FetchPlanets();
  }, [actions]);

  useEffect(() => {
    if (store.planets.length > 0) {
      store.planets.forEach(planet => {
        if (!store.planetDetails[planet.uid]) {
          actions.FetchPlanetDetails(planet.uid);
        }
      });
    }
  }, [store.planets, actions]);

  console.log("Store Planets:", store.planets);

  return (
    <div className="container-fluid mt-5">
      <h2 className="pt-3">The Planets</h2>
      <div className="row">
        {store.planets &&
          store.planets.map((planet, index) => (
            <div className="col-md-4" key={index}>
              <Card
                title={planet.name}
                description={`Population: ${
                  store.planetDetails[planet.uid]?.population || "N/A"
                }, Terrain: ${
                  store.planetDetails[planet.uid]?.terrain || "N/A"
                }`}
                imageUrl={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                item={planet}
                type="planets"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Planets;
