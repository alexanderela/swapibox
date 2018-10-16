import React, {Component} from 'react';
import './Card.css'
import PropTypes from 'prop-types';


class Card extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSelected: false,
		}
	}

selectCard = (card) => {
	// card.isFavorite = !card.isFavorite
	this.setState({ 
		isSelected: !this.state.isSelected
	})
	if (card.isFavorite === true) {
		this.props.addToFavorites(card)
	
	} else if (card.isFavorite === false) {
	console.log(card)
		this.props.removeFromFavorites(card.name)
	}
}

render() {
	const { name, homeWorld, species, people, vehicles, planets, isFavorite, type, id } = this.props
	const { isSelected } = this.state

if (people) {
	// console.log(people)
	return (
		<div className="Card">
	    <div className="fav-btn-card-container">
		    <h3>{name}</h3>
		    <button 
		    	className={ `fav-btn people-fav 
		    		${isSelected ? "fav-btn-active" : "fav-btn-inactive"}` }
		    	onClick={() => this.selectCard(people)}
		    >
		    	<i className="fas fa-jedi"></i>
		    </button>
	    </div>
	    <p className="card-text" >
	    	<span className="card-header">Species:
	    	</span> {species.speciesName}</p>
	    <p className="card-text">
	    	<span className="card-header">Language:
	    	</span> {species.language}</p>
	    <p className="card-text">
	    	<span className="card-header">Homeworld:
	    	</span> {homeWorld.planetName}</p>
	    <p className="card-text">
	    	<span className="card-header">Population:
	    	</span> {homeWorld.planetPop}</p>
		</div>
	)
} else if (vehicles) {

	return (
		<div className="Card">
	    <div className="fav-btn-card-container">
		    <h3>{vehicles.name}</h3>
		    <button 
		    	className={ `fav-btn vehicle-fav 
		    		${isSelected ? "fav-btn-active" : "fav-btn-inactive"}` }
		    	onClick={() => this.selectCard(vehicles)}
		    >
		    	<i className="fas fa-jedi"></i>
		    </button>
	    </div>
	    <p className="card-text">
	    	<span className="card-header">Model:
	    	</span> {vehicles.model}</p>
	    <p className="card-text">
	    	<span className="card-header">Class:
	    	</span> {vehicles.class}</p>
	    <p className="card-text">
	    	<span className="card-header">Passengers:
	    	</span> {vehicles.passengers}</p>
		</div>
	)
} else if (planets) {
	return (
		<div className="Card">
	    <div className="fav-btn-card-container">
		    <h3>{planets.name}</h3>
		    <button 
		    	className={ `fav-btn planet-fav
		    		${isSelected ? "fav-btn-active" : "fav-btn-inactive"}` }
		    	onClick={() => this.selectCard(planets)}
		    >
		    	<i className="fas fa-jedi"></i>
		    </button>
	    </div>
	    <p className="card-text">
	    	<span className="card-header">Terrain:
	    	</span> {planets.terrain}</p>
	    <p className="card-text">
	    	<span className="card-header">Population:
	    	</span> {planets.population}</p>
	    <p className="card-text">
	    	<span className="card-header">Climate:
	    	</span> {planets.climate}</p>
	    <p className="card-text">
	    	<span className="card-header">Residents:
	    	</span> 
	    		<span className="planet-residents">
	    			{planets.residents.join(", ") || "n/a"}
	    		</span></p>
		</div>
	)	
}
}

}
Card.propTypes = {
		people: PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object
]),
	vehicles: PropTypes.object,
	planets: PropTypes.object,
	addToFavorites: PropTypes.func,
	removeFromFavorites: PropTypes.func
}

export default Card