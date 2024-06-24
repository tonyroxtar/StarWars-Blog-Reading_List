import React, { useEffect, useContext } from "react";
import Card from "../components/Card";
import { Context } from "../store/appContext";

const Characters = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.FetchCharacters();
  }, [actions]);

  useEffect(() => {
    if (store.characters.length > 0) {
      store.characters.forEach(character => {
        if (!store.characterDetails[character.uid]) {
          actions.FetchCharacterDetails(character.uid);
        }
      });
    }
  }, [store.characters, actions]);

  console.log('Store Characters:', store.characters);

  return (
    <div className="container-fluid mt-5">
      <h1 className="pt-3">The Characters</h1>
      <div className="row">
        {store.characters && store.characters.map((character, index) => (
          <div className="col-md-4" key={index}>
            <Card
              title={character.name}
              description={`Gender: ${store.characterDetails[character.uid]?.gender || 'N/A'}, Birth Year: ${store.characterDetails[character.uid]?.birth_year || 'N/A'}`}
              imageUrl={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`} // URL específica de la imagen
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
