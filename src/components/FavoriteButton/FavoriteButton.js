import React from 'react';
import { NavLink } from 'react-router-dom';

import './FavoriteButton.css';
import PropTypes from 'prop-types';

const FavoriteButton = ({ favorites, handleFavoritesClick, favoritesSelected }) => (
  <div className="FavoriteButton">
    <button
      className={`cat-button favorites-button 
            ${favoritesSelected
        ? 'cat-button-active'
        : 'cat-button-inactive'}`}
      name="favorites"
      onClick={e => handleFavoritesClick(e)}
    >
      <NavLink to="/favorites" className="nav">Favorites</NavLink>
      <span className="favorites-count">
        {favorites ? favorites.length : 0}
      </span>
    </button>
  </div>
);

FavoriteButton.propTypes = {
  favorites: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
  ]),
  handleFavoritesClick: PropTypes.func,
  favoritesSelected: PropTypes.bool,
};

export default FavoriteButton;
