import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Favorites = () => {
  const { store, actions } = useContext(Context);

  if (!store || !store.favorites) {
    return null;
  }

  return (
    <Dropdown className="favorites-dropdown">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Favorites ({store.favorites.length})
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {store.favorites.length > 0 ? (
          store.favorites.map((item, index) => (
            <Dropdown.Item key={index} className="d-flex justify-content-between align-items-center">
              {item.name}
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => actions.removeFromFavorites(item)}
              >
                X
              </button>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item>No favorites yet</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Favorites;
