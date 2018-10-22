import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ entry, toggleFavorites, favorites, isFavorite }) => {
  const cardProperties = entry.properties.map(property => (
    <p key={property.header} className="card-text">
      <span className="card-header">
        {property.header}
      </span>
      {property.text}
    </p>
  ));

  return (
    <div className="Card">
      <div className="fav-btn-card-container">
        <h3>{entry.name}</h3>
        <button
          type="submit"
          className={`fav-btn 
						${(isFavorite || favorites.includes(entry))
            ? 'fav-btn-active'
            : 'fav-btn-inactive'}`}
          onClick={() => toggleFavorites(entry)}
        >
          <i className="fas fa-jedi" />
        </button>
      </div>
      {cardProperties}
    </div>
  );
};

Card.propTypes = {
  entry: PropTypes.object,
  toggleFavorites: PropTypes.func,
  favorites: PropTypes.array,
  isFavorite: PropTypes.bool,
};

export default Card;
