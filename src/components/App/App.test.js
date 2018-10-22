/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import * as DataCleaner from '../../DataCleaner.js';
import CardContainer from '../CardContainer/CardContainer.js';
import Nav from '../Nav/Nav.js';
import films from '../../mockData/mockFilms.js';
import people from '../../mockData/mockPeople.js';
import vehicles from '../../mockData/mockVehicles.js';
import planets from '../../mockData/mockPlanets.js';
import resolvedPeople from '../../mockData/mockResolvedPeople.js';
import mockPerson from '../../mockData/mockPerson.js';
import mockSpecies from '../../mockData/mockSpecies.js';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
  	<App />
  </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});

let wrapper;
let mockEvent;
let mockLuke;
let mockVehicle;
let mockPlanet;
let mockFilm;
let expected;
let mockEntry;
let	mockFavs = [{
          name: "Dina Caraballo",
          id: "Dina Caraballo",
          isFavorite: true, 
          type:"people",
          properties: [
						{header: 'Homeworld: ', text: "Earth"},
						{header: 'Species: ', text: "human"},
						{header: 'Population: ', text: "7,000,000,000"},
						{header: 'Language: ', text: "Galactic Basic"}
					] 
        },
        {
          name: "Alex Ela",
          id: "Alex Ela",
          isFavorite: true, 
          type:"people",
          properties: [
						{header: 'Homeworld: ', text: "Earth"},
						{header: 'Species: ', text: "human"},
						{header: 'Population: ', text: "7,000,000,000"},
						{header: 'Language: ', text: "Galactic Basic"}
					] 
        }, 
        {
          "name": "Luke Skywalker",
          "id": "Luke Skywalker",
          "isFavorite": true, 
          "type":"people",
          "properties": [
						{"header": 'Homeworld: ', "text": "Tatooine"},
						{"header": 'Species: ', "text": "human"},
						{"header": 'Population: ', "text": "200,000"},
						{"header": 'Language: ', "text": "Galactic Basic"}
						] 
	        }]

beforeEach(() => {
	wrapper = shallow(<App />);	
	mockEvent = { target: true }
})

afterEach(() => {
	localStorage.clear()
})

describe('App component', () => {
	it('matches the snapshot', () => {
		expect(wrapper).toMatchSnapshot();
	})

	it('has the correct default state for all categories', () => {
		expect(wrapper.state().films).not.toBe('{}')
		expect(wrapper.state().people).toEqual([])
		expect(wrapper.state().vehicles).toEqual([])
		expect(wrapper.state().planets).toEqual([])
		expect(wrapper.state().favorites).toEqual([])
	})

	it('passes the correct favoritesCount props to Nav', () => {
		wrapper.setState({ favorites: [{name: 'alvin', type: 'chipmunk'}] })
		const navComponent = wrapper.find(Nav)
		expect(navComponent.props().favorites.length).toEqual(1)
	})

	it('passes favoritesCount props to Nav if they exist in state', () => {
		const mockVehicles = [{"make": "mustang"}, {"make": "camaro"}]
		wrapper.setState({ favorites: mockVehicles })
		const navComponent = wrapper.find(Nav)
		expect(navComponent.props().favorites.length).toEqual(2)
	})

	describe('componentDidMount', () => {
		it('invokes corrects functions on componentDidMount', () => {
			wrapper.instance().getFilm = jest.fn()
			wrapper.instance().showPeople = jest.fn()
			wrapper.instance().showVehicles = jest.fn()
			wrapper.instance().showPlanets = jest.fn()
			wrapper.instance().getFavorites = jest.fn()
			wrapper.instance().componentDidMount()
			expect(wrapper.instance().getFilm).toHaveBeenCalled()
			expect(wrapper.instance().showPeople).toHaveBeenCalled()
			expect(wrapper.instance().showVehicles).toHaveBeenCalled()
			expect(wrapper.instance().showPlanets).toHaveBeenCalled()
			expect(wrapper.instance().getFavorites).toHaveBeenCalled()
		})
	})

	describe('toggleFavorites', () => {
		it('adds cards to favorites if not already contained in the favorites array', () => {
			mockEntry = {
		        "name": "Sand Cralwer",
		        "id": "Sand Cralwer",
		        "isFavorite": false, 
		        "type":"vehicles",
		        "properties": [
							{"header": 'Model: ', "text": "Digger Crawler"},
							{"header": 'Class: ', "text": "wheeled"},
							{"header": 'Passengers: ', "text": "1"}
						] 
		      }
			wrapper.setState({ favorites: []})
			wrapper.instance().toggleFavorites(mockEntry)
			expect(wrapper.state().favorites).toEqual([mockEntry])
		})

		it('removes cards from favorites if they are already in favorites array', async () => {
			expected = [{
          name: "Dina Caraballo",
          id: "Dina Caraballo",
          isFavorite: true, 
          type:"people",
          properties: [
						{header: 'Homeworld: ', text: "Earth"},
						{header: 'Species: ', text: "human"},
						{header: 'Population: ', text: "7,000,000,000"},
						{header: 'Language: ', text: "Galactic Basic"}
					] 
        },
        {
          name: "Alex Ela",
          id: "Alex Ela",
          isFavorite: true, 
          type:"people",
          properties: [
						{header: 'Homeworld: ', text: "Earth"},
						{header: 'Species: ', text: "human"},
						{header: 'Population: ', text: "7,000,000,000"},
						{header: 'Language: ', text: "Galactic Basic"}
					] 
        }]
			mockEntry =	{
        "name": "Luke Skywalker",
        "id": "Luke Skywalker",
        "isFavorite": true, 
        "type":"people",
        "properties": [
					{"header": 'Homeworld: ', "text": "Tatooine"},
					{"header": 'Species: ', "text": "human"},
					{"header": 'Population: ', "text": "200,000"},
					{"header": 'Language: ', "text": "Galactic Basic"}
					] 
        }
			wrapper.setState({ favorites: mockFavs })
			wrapper.instance().toggleFavorites(mockEntry)
			expect(wrapper.state().favorites).toEqual(expected)
		})

	})

	describe('isInFavorites', () => {
		it('should find a match for the given entry', () => {
			mockEntry =	{
        "name": "Luke Skywalker",
        "id": "Luke Skywalker",
        "isFavorite": true, 
        "type":"people",
        "properties": [
					{"header": 'Homeworld: ', "text": "Tatooine"},
					{"header": 'Species: ', "text": "human"},
					{"header": 'Population: ', "text": "200,000"},
					{"header": 'Language: ', "text": "Galactic Basic"}
					] 
        }

      wrapper.setState({ favorites: mockFavs })
			expect(wrapper.instance().isInFavorites(mockEntry)).toEqual(mockEntry)
		})
	})

	describe('toggleErrorPopup', () => {
		it('should reverse the state of showError popup', () => {
			wrapper.instance().toggleErrorPopup()
			expect(wrapper.state().showErrorPopup).toBe(true)
		})
	})

	describe('showFavorites', () => {
		it('if there are favorites it should change favoritesSelected to true', () => {
			wrapper.setState({ favorites: mockFavs })
			wrapper.instance().showFavorites()
			expect(wrapper.state().favoritesSelected).toBe(true)
		})

		it('if there are no favorites it should call toggleErrorPopup', () => {
			const spy = spyOn(wrapper.instance(), 'toggleErrorPopup')
			wrapper.setState({ favorites: [] })
			wrapper.instance().showFavorites()
			expect(spy).toHaveBeenCalled()
		})
	})

	describe('getFilm', () => {
		it('should call getMovie', async () => {
			const spy = spyOn(DataCleaner, 'getMovie')
			await wrapper.instance().getFilm()
			await expect(spy).toHaveBeenCalled()
		})

		it('should setState', async () => {
			const spy = spyOn(DataCleaner, 'getMovie')
			expected = await DataCleaner.getMovie()
			await wrapper.instance().getFilm()
			await expect(wrapper.state().films).toEqual(expected)
		})
	})

	describe('getPeople', () => {
		it('should call getPerson', async () => {
			const spy = spyOn(DataCleaner, 'getPerson')
			await wrapper.instance().getPeople()
			await expect(spy).toHaveBeenCalled()
		})

		it('should setState', async () => {
			const spy = spyOn(DataCleaner, 'getPerson')
			expected = await DataCleaner.getPerson()
			await wrapper.instance().getPeople()
			await expect(wrapper.state().people).toEqual(expected)
		})
	})

	describe('getPlanets', () => {
		it('should call getPlanet', async () => {
			const spy = spyOn(DataCleaner, 'getPlanet')
			await wrapper.instance().getPlanets()
			await expect(spy).toHaveBeenCalled()
		})

		it('should setState', async () => {
			const spy = spyOn(DataCleaner, 'getPlanet')
			expected = await DataCleaner.getPlanet()
			await wrapper.instance().getPlanets()
			await expect(wrapper.state().planets).toEqual(expected)
		})
	})

	describe('getVehicles', () => {
		it('should call getVehicle', async () => {
			const spy = spyOn(DataCleaner, 'getVehicle')
			await wrapper.instance().getVehicles()
			await expect(spy).toHaveBeenCalled()
		})

		it('should setState', async () => {
			const spy = spyOn(DataCleaner, 'getVehicle')
			expected = await DataCleaner.getVehicle()
			await wrapper.instance().getVehicles()
			await expect(wrapper.state().vehicles).toEqual(expected)
		})
	})

	describe('setLocalStorage', () => {
		it('sets people data to local storage', () => {
			const mockData = [{ "class": "wheeled", "model": "Digger Crawler" }, 
			{"class": "tires", "model": "Mustang"}]
			wrapper.instance().setLocalStorage('mockData', mockData)
			expect(JSON.parse(localStorage.getItem('mockData'))).toEqual(mockData)
			localStorage.clear()
		})
	})

	describe('getLocalStorage', () => {
		it('gets and parses data from local storage', () => {
			localStorage.clear()
			const mockData = [{ "class": "wheeled", "model": "Digger Crawler" }, 
			{"class": "tires", "model": "Mustang"}]
			localStorage.setItem('mockData', JSON.stringify(mockData))
			const	getStorage = wrapper.instance().getLocalStorage('mockData')
			expect(getStorage).toEqual(mockData) 
			localStorage.clear()
		})
	})

	describe('showPeople', () => {
		it('sets people to state ', async () => {
			mockLuke = {
        "name": "Luke Skywalker",
        "id": "Luke Skywalker",
        "isFavorite": false, 
        "type":"people",
        "properties": [
					{"header": 'Homeworld: ', "text": "Tatooine"},
					{"header": 'Species: ', "text": "human"},
					{"header": 'Population: ', "text": "200,000"},
					{"header": 'Language: ', "text": "Galactic Basic"}
				] 
      }
			DataCleaner.getPerson = jest.fn().mockImplementation(() => Promise.resolve(
		 		mockLuke))
			await wrapper.instance().showPeople()
		  await expect(wrapper.state().people).toEqual(mockLuke)
		})
		
		it('calls getVehicles if there are no vehicles in local storage', async () => {
			const spy = spyOn(wrapper.instance(), 'showVehicles')
			localStorage.clear()
			wrapper.instance().showVehicles()
			expect(spy).toHaveBeenCalled()
		})

		it('retrieves vehicles from local storage if there are vehicles in local storage', async () => {
			localStorage.setItem('vehicles', JSON.stringify(mockFavs))
			const spy = spyOn(wrapper.instance(), 'getLocalStorage')	
			wrapper.instance().showVehicles()	
			expect(spy).toHaveBeenCalled()				
		})
	})

	describe('showVehicles', () => {
		beforeEach(() => {
			mockVehicle = {
          "name": "Sand Cralwer",
          "id": "Sand Cralwer",
          "isFavorite": false, 
          "type":"vehicles",
          "properties": [
						{"header": 'Model: ', "text": "Digger Crawler"},
						{"header": 'Class: ', "text": "wheeled"},
						{"header": 'Passengers: ', "text": "1"}
					] 
        }
		})
		it('sets vehicles to state ', async () => {
			DataCleaner.getVehicle = jest.fn().mockImplementation(() => Promise.resolve(
		 		mockVehicle))
			await wrapper.instance().showVehicles()
		  await expect(wrapper.state().vehicles).toEqual(mockVehicle)
		})

		it('calls getPeople if there are no people in local storage', async () => {
			const spy = spyOn(wrapper.instance(), 'showPeople')
			localStorage.clear()
			wrapper.instance().showPeople()
			expect(spy).toHaveBeenCalled()
		})

		it('retrieves people from local storage if there are people in local storage', async () => {
			localStorage.setItem('people', JSON.stringify(mockVehicle))
			const spy = spyOn(wrapper.instance(), 'getLocalStorage')	
			wrapper.instance().showPeople()	
			expect(spy).toHaveBeenCalled()				
		})
	})

	describe('showPlanets', () => {
		it('sets planets to state ', async () => {
			mockPlanet = {"name": "Alderaan", 
				"terrain": "grasslands, mountains", 
				"population": "2000000000", "climate": "temperate", 
			"residents": 
				["Leia Organa", "Bail Prestor Organa", "Raymus Antilles"]}
			DataCleaner.getPlanet = jest.fn().mockImplementation(() => Promise.resolve(
		 		mockPlanet))
			await wrapper.instance().showPlanets()
		  await expect(wrapper.state().planets).toEqual(mockPlanet)	
	})

		it('calls getPlanets if there are no planets in local storage', async () => {
			const spy = spyOn(wrapper.instance(), 'showPlanets')
			localStorage.clear()
			wrapper.instance().showPlanets()
			expect(spy).toHaveBeenCalled()
		})

		it('retrieves planets from local storage if there are planets in local storage', async () => {
			localStorage.setItem('planets', JSON.stringify(mockVehicle))
			const spy = spyOn(wrapper.instance(), 'getLocalStorage')	
			wrapper.instance().showPlanets()	
			expect(spy).toHaveBeenCalled()				
		})
	})
})