import React, { Component } from 'react';
import './Sidebar.css';
import PropTypes from 'prop-types';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {	
		}
	}

	romanizeNum = (episodeNum) => {
	  let roman = ''
	  let romanNums = [
	  	'I','II','III','IV','V','VI','VII','VIII','IX', 'X'
	  ]
	  romanNums.forEach(num => {
	  	if(romanNums[episodeNum]) {
	  		roman = romanNums[episodeNum]
	  	}
	  })
	  return roman
	}

	render() {
		const { films } = this.props
		return (
			<div className="Sidebar fade">
				<div className="star-wars">
					<div className="crawl">	    
			    <div className="title">
			      <p>Episode {this.romanizeNum(films.episode_id)}</p>
			      <h1 className="film-title">{films.title}</h1>
			      <p>Released:  {films.date}</p>
			    </div>
			    <p>{films.opening_crawl}</p>
			  	</div>
				</div>
			</div>
		);
	}
}

Sidebar.propTypes = {
	films: PropTypes.object
}

export default Sidebar;