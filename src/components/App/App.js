import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Sidebar from '../Sidebar/Sidebar.js';
import CardContainer from '../CardContainer/CardContainer.js';
import * as DataCleaner from '../../DataCleaner.js';
import Nav from '../Nav/Nav.js';
import ErrorPopup from '../ErrorPopup/ErrorPopup.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: {},
      people: [],
      vehicles: [],
      planets: [],
      peopleSelected: false,
      vehiclesSelected: false,
      planetsSelected: false,
      favorites: [],
      scroll: true,
      favoritesSelected: false,
      showErrorPopup: false
    }
  }

  async componentDidMount() {
    this.getFilm()
    this.showPeople()
    this.showVehicles()
    this.showPlanets()
    this.getFavorites()
  }

  toggleFavorites = async (entry) => {
    let favorites;
    const { type, id } = entry
    const category = this.state[type].map(card => {
      if(card.id === id) {
        return {...card, isFavorite: !card.isFavorite}
      }
      return card
    })

    if (!this.isInFavorites(entry)) {
      favorites = [...this.state.favorites, entry]
    } else {
      favorites = this.state.favorites.filter(card => card.id !== id)      
    }

    await this.setState({ [type]: category, favorites: favorites })
    await this.setLocalStorage('favorites', favorites)
    await this.setLocalStorage( [type], category)
  }

  isInFavorites = (entry) => {
    return this.state.favorites.find((fav) => fav.id === entry.id)
  }

  toggleErrorPopup = () => {
    this.setState({
      showErrorPopup: !this.state.showErrorPopup
    })
  }

  showFavorites = () => {
    if(this.state.favorites.length) {
      this.setState({ 
        favoritesSelected: true,
        peopleSelected: false,
        planetsSelected: false,
        vehiclesSelected: false, 
      })
    } else {
        this.toggleErrorPopup()  
    }
  }

  getFilm = async () => {
    const films = await DataCleaner.getMovie()
    this.setState({ films })
  }

  getPeople = async () => {
    const people = await DataCleaner.getPerson()
    this.setState({ people })
    this.setLocalStorage('people', people)
  }

  getPlanets = async () => {
    const planets = await DataCleaner.getPlanet()
    this.setState({ planets })
    this.setLocalStorage('planets', planets)
  }

  getVehicles = async () => {
    const vehicles = await DataCleaner.getVehicle()
    this.setState({ vehicles })
    this.setLocalStorage('vehicles', vehicles)
  }

  getFavorites = async () => {
    const { favorites } = this.state
    if (!localStorage.favorites && favorites.length) {
      this.setLocalStorage('favorites', favorites)
    } else if (localStorage.favorites) {
      const newFavorites = await this.getLocalStorage('favorites')
      this.setState({favorites: newFavorites})
    }
  }

  setLocalStorage = (key, category) => {
    localStorage.setItem(key, JSON.stringify(category))
  }

  getLocalStorage = (categoryName) => {
    if(localStorage.length) {
      return JSON.parse(localStorage.getItem(categoryName))
    }
  }

  showPeople = async (e) => {  
    if (!localStorage.people) {
      await this.getPeople()
    } else if (localStorage.people) {
      const retrievedPeople = this.getLocalStorage('people')
      this.setState({ 
        people: retrievedPeople,
        peopleSelected: true,
        planetsSelected: false,
        vehiclesSelected: false,
        favoritesSelected: false,
        scroll: false
      })
    }
  }
  
  showVehicles = async (e) => {
    if (!localStorage.vehicles) {
      await this.getVehicles()
    } else if (localStorage.vehicles) {
      const retrievedVehicles = this.getLocalStorage('vehicles')
      this.setState({
        vehicles: retrievedVehicles,
        vehiclesSelected: true,
        peopleSelected: false,
        planetsSelected: false,
        favoritesSelected: false,
        scroll: false
      })
    }
  }

  showPlanets = async (e) => {
    if (!localStorage.planets) {
      await this.getPlanets()
    } else if (localStorage.planets) {
      const retrievedPlanets = this.getLocalStorage('planets')
      this.setState({
        planets: retrievedPlanets,
        planetsSelected: true,
        peopleSelected: false,
        vehiclesSelected: false,
        favoritesSelected: false,
        scroll: false
      })
    }
  }

  render() {
    const { 
            films, 
            people, 
            vehicles, 
            planets, 
            favorites, 
            showErrorPopup
          } = this.state

    return (
      <div className="App">
        <header className="header">
          <h1 className="app-title">SWAP<span className="title-i">I</span> Box</h1>
          <Nav
            showPeople={this.showPeople}
            showPlanet={this.showPlanets}
            showVehicle={this.showVehicles}
            showFavorites={this.showFavorites}
            favorites={favorites}
            toggleErrorPopup={this.toggleErrorPopup}
          />
        </header>
        {showErrorPopup 
          ?
          <ErrorPopup
            text="close"
            closeError={this.toggleErrorPopup}
          />
          : <div className="error-popup-placeholder"></div>
        }
        <Route exact path="/" render={(props) => <Sidebar {...props} films={films} />}
        />
        <Route 
          exact path="/people" 
          render={(props) => <CardContainer {...props} 
            entries={people} 
            toggleFavorites={this.toggleFavorites} 
            favorites={favorites} 
          />}
        />
        <Route 
          exact path="/vehicles" 
          render={(props) => <CardContainer {...props} 
            entries={vehicles} 
            toggleFavorites={this.toggleFavorites} 
            favorites={favorites} 
          />}
        />
        <Route 
          exact path="/planets" 
          render={(props) => <CardContainer {...props} 
            entries={planets} 
            toggleFavorites={this.toggleFavorites} 
            favorites={favorites} 
          />}
        />
        <Route 
          exact path="/favorites" 
          render={(props) => <CardContainer {...props} 
            entries={favorites} 
            toggleFavorites={this.toggleFavorites} 
            favorites={favorites} 
          />}
        />
      </div>
    );
  }
}

export default App;

