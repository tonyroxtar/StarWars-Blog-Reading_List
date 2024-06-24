import React, { useEffect, useContext } from "react";
import Card from "../components/Card";
import { Context } from "../store/appContext";

const Ships = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.FetchShips();
  }, [actions]);

  useEffect(() => {
    const fetchDetails = async () => {
      for (const ship of store.ships) {
        await actions.FetchShipDetails(ship.uid);
      }
    };
    if (store.ships.length > 0) {
      fetchDetails();
    }
  }, [store.ships, actions]);

  console.log('Store Ships:', store.ships);

  return (
    <div className="container-fluid mt-5">
      <h1 className="pt-3">The Ships</h1>
      <div className="row">
        {store.ships && store.ships.map((ship, index) => (
          <div className="col-md-4" key={index}>
            <Card
              title={ship.name}
              description={`Model: ${store.shipDetails[ship.uid]?.model || 'N/A'}, Manufacturer: ${store.shipDetails[ship.uid]?.manufacturer || 'N/A'}`}
              imageUrl={`https://starwars-visualguide.com/assets/img/starships/${ship.uid}.jpg`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ships;
