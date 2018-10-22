import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css'
import FavoriteButton from '../FavoriteButton/FavoriteButton.js';
import PropTypes from 'prop-types';


class Nav extends Component {
	constructor(props) {
		super(props)
		this.state = {
      peopleSelected: false,
      vehiclesSelected: false,
      planetsSelected: false,
      favoritesSelected: false
		}
	}

	handlePeopleClick = () => {
		if (this.state.peopleSelected === true) {
			this.setState({ peopleSelected: false })
		} else {
			this.setState({ 
				peopleSelected: true,      
				vehiclesSelected: false,
      	planetsSelected: false,
      	favoritesSelected: false 
			})	
			this.props.showPeople()
		}
	}

	handlePlanetClick = () => {
		if (this.state.planetsSelected === true) {
			this.setState({ planetsSelected: false })
		} else {
			this.setState({ 
				peopleSelected: false,      
				vehiclesSelected: false,
				planetsSelected: true,
				favoritesSelected: false 
			})	
			this.props.showPlanet()
		}
	}

	handleVehicleClick = () => {
		if (this.state.vehiclesSelected === true) {
			this.setState({ vehiclesSelected: false })
		} else {
			this.setState({ 				
				peopleSelected: false,      
				vehiclesSelected: true,
				planetsSelected: false,
				favoritesSelected: false 
			})	
			this.props.showVehicle()
		}
	}

	handleFavoritesClick = () => {
		if (this.state.favoritesSelected === true) {
			this.setState({ favoritesSelected: false })
		} else {
			this.setState({
				peopleSelected: false,
				vehiclesSelected: false,
				planetsSelected: false,
				favoritesSelected: true
			})
			this.props.showFavorites()
		}
	}

render() {
	const { favorites } = this.props
	const { peopleSelected, planetsSelected, vehiclesSelected, favoritesSelected } = this.state

	return(
		<div className="Nav">
		    <button 
		      className={`cat-button people-button 
		      	${peopleSelected 
		      		? "cat-button-active" 
		      		: "cat-button-inactive" }`}
		      name="people"
		      onClick={this.handlePeopleClick}
		    >
		    	<NavLink to="/people" className="nav">People</NavLink>
		    </button>
		    <button 
		      className={`cat-button planets-button 
		      	${planetsSelected 
		      		? "cat-button-active" 
		      		: "cat-button-inactive" }`}
		      name="planets"
		      onClick={this.handlePlanetClick}
		    >
		    	<NavLink to="/planets" className="nav">Planets</NavLink>
		    </button>
		    <button 
		      className={`cat-button vehicles-button 
		      	${vehiclesSelected 
		      		? "cat-button-active" 
		      		: "cat-button-inactive" }`}
		      name="vehicles"
		      onClick={this.handleVehicleClick}
		    >
		    	<NavLink to="/vehicles" className="nav">Vehicles</NavLink>
		    </button>
		    <FavoriteButton 
		    	className="FavoriteButton"
		    	favorites={favorites}
		    	handleFavoritesClick={this.handleFavoritesClick}
		    	favoritesSelected={favoritesSelected}
		    />
		</div>
		)
	}
}

Nav.propTypes = {
	showPeople: PropTypes.func,
	showVehicle: PropTypes.func,
	showPlanet: PropTypes.func,
	favorites: PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.number
  ]),
  toggleCategoryState: PropTypes.func,
  showFavorites: PropTypes.func,
  toggleErrorPopup: PropTypes.func
}

export default Nav;