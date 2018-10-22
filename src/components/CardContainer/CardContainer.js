import React from 'react';
import './CardContainer.css';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

const CardContainer = ({ entries, toggleFavorites, favorites }) => {
  const cards = entries.map(entry => (
    <Card
      entry={entry}
      key={entry.name}
      toggleFavorites={toggleFavorites}
      favorites={favorites}
      isFavorite={entry.isFavorite}
    />
  ));

  return (
    <div className="CardContainer">
      { cards }
    </div>
  );
};

CardContainer.propTypes = {
  entries: PropTypes.array,
  toggleFavorites: PropTypes.func,
  favorites: PropTypes.array,
};

export default CardContainer;
