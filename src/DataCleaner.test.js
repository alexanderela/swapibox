import React from 'react';
import ReactDOM from 'react-dom';
import films from './mockData/mockFilms.js';
import people from './mockData/mockPeople.js';
import planets from './mockData/mockPlanets.js';
import vehicles from './mockData/mockVehicles.js';
import resolvedPeople from './mockData/mockResolvedPeople.js';
import mockPerson from './mockData/mockPerson.js';
import mockSpecies from './mockData/mockSpecies.js';
import mockNewPerson from './mockData/mockNewPerson.js';
import * as API from './apiCalls';
import * as DataCleaner from './DataCleaner.js';

describe('DataCleaner', () => {

	describe('getMovie', () => {
		//Passing
		it('calls fetchData', async () => { 
			API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(films))
			await DataCleaner.getMovie()
			await expect(API.fetchData).toHaveBeenCalled()
		})

		it('calls returnMovieInfo with the correct parameters',  async () => {
			API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(films))
			const mockRandomEpisode = 5
			const mockMovieDataCollection = await films.results[mockRandomEpisode]
			DataCleaner.returnMovieInfo = jest.fn().mockImplementation(() => films)
			await DataCleaner.getMovie()
			expect(DataCleaner.returnMovieInfo).toHaveBeenCalled()
		})
	})

	describe('returnMovieInfo', () => {
		const mockFilm = {
				opening_crawl: 'opening title',
		 		episode_id: 'episode number',
		 		title: 'title',
		 		date: '1977'
		}

		it('returns an object with the correct format', () => {
			expect(typeof DataCleaner.returnMovieInfo(mockFilm)).toBe('object')
		})
	})

	
	describe('getPerson', () => {
		//Passing
		it('calls fetchData', async () => {
			API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(people))
			await DataCleaner.getPerson()
			await expect(API.fetchData).toHaveBeenCalled()
		})

		it('calls returnPeopleData', async () => {
			const mockPeopleData = await people
			API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(people))
			const returnPeopleData = jest.fn().mockImplementation((mockPeopleData) => people.results)
			
			await DataCleaner.getPerson()
			expect(DataCleaner.returnPeopleData).toHaveBeenCalled()
		})

		it('calls returnPeopleData with the correct parameters', async () => {
			const mockPeopleData = people.results
			const spy = spyOn(mockDataCleaner, 'returnPeopleData')
			await mockDataCleaner.getPerson()
			expect(spy).toHaveBeenCalledWith(mockPeopleData)
		})

		xit('resolves to expected', async () => {
			//Setup
			const mockReturnedPeopleData = [
				{
					name: 'Luke Skywalker',
					homeWorld: "https://swapi.co/api/planets/1/",
					species: "https://swapi.co/api/species/1/",
					isFavorite: false,
					type: 'people'
				},
				{
					name: 'C-3PO',
					homeWorld: "https://swapi.co/api/planets/1/",
					species: "https://swapi.co/api/species/2/",
					isFavorite: false,
					type: 'people'
				}
			]
			const expected = [
				{
					name: 'Luke Skywalker', 
					homeWorld: 'Tatooine', 
					species: 'human', 
					isFavorite: false, 
					type: 'people'
				},
				{
					name: 'C-3PO',
					homeWorld: 'Tatooine',
					species: 'droid',
					isFavorite: false,
					type: 'people'
				}
			]
			Promise.all(mockReturnedPeopleData)

			expect(Promise.all(mockReturnedPeopleData)).resolves.toEqual(expected)
		})
	})

	
	describe('returnPeopleData', () => {
		xit('should call getHomeWorld', async () => {
			//Setup
			const mockPersonCollection = await people.results
			const getHomeWorld = jest.fn()
			const returnPeopleData = jest.fn((mockPersonCollection) => {
				mockPersonCollection.map(async person => {
					const mockNewPerson = {}
					mockNewPerson.homeWorld = await getHomeWorld(person)
				})
			})
			//Execution
			returnPeopleData(mockPersonCollection)
			//Expectation
			await expect(getHomeWorld).toBeCalled()
		})

		xit('should call getSpecies', async () => {
			//Setup
			const mockPersonCollection = await people.results
			const getSpecies = jest.fn()
			const returnPeopleData = jest.fn((mockPersonCollection) => {
				mockPersonCollection.map(async person => {
					const mockNewPerson = {}
					mockNewPerson.species = await getSpecies(person)
				})
			})
			//Execution
			returnPeopleData(mockPersonCollection)
			//Expectation
			await expect(getSpecies).toBeCalled()
		})
	})

	
	describe('getHomeWorld', () => {
		//Passing
		it('calls fetchData', async () => {
			let mockHomeWorld = 'Tatooine'
			API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(mockHomeWorld))
			await DataCleaner.getHomeWorld(mockNewPerson)
			await expect(API.fetchData).toHaveBeenCalled()
		})
	})

	
	describe('getSpecies', () => {
		//Passing
		it('calls fetchData', async () => {
			let mockSpecies = 'Human'
			API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(mockSpecies))
			await DataCleaner.getHomeWorld(mockNewPerson)
			await expect(API.fetchData).toHaveBeenCalled()
		})
	})

	describe('getPlanet', () => {
		it('calls fetchData', async () => {
			API.fetchData = jest.fn().mockImplementation(() => Promise.resolve(planets))
			await DataCleaner.getPlanet()
			await expect(API.fetchData).toHaveBeenCalled()
		})

		xit('calls returnPlanetData with the correct parameters', async () => {
			
		})
	})

	describe('returnPlanetData', () => {
		xit('should call getResidents', async () => {
			
		})
	})

	describe('getResidents', () => {
		xit('should call getTenants with the correct parameters', async () => {
			//Setup
			const residents = [
        "https://swapi.co/api/people/5/",
        "https://swapi.co/api/people/68/",
        "https://swapi.co/api/people/81/"
      ]
			const getTenants = jest.fn()
			const getResidents = jest.fn(() => {
				getTenants(residents)
			})
			//Execution
			getResidents()
			//Expectation
			await expect(getTenants).toBeCalled()
		})
	})

	describe('getTenants', () => {
		const residents = [
      "https://swapi.co/api/people/5/",
      "https://swapi.co/api/people/68/",
      "https://swapi.co/api/people/81/"
    ]
		xit('should call fetch for each resident', async () => {
			const getTenants = jest.fn((mockResidentCollection) => {
				mockResidentCollection.map(async resident => {
					window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
						status:200,
						json: () => Promise.resolve(residents)
					}))		
				})
			})
			
			dataCleaner.getTenants(residents)
			await expect(window.fetch).toHaveBeenCalledWith(residents[0])
			await expect(window.fetch).toHaveBeenCalledWith(residents[1])
			await expect(window.fetch).toHaveBeenCalledWith(residents[2])
		})
	})

	describe('getVehicle', () => {

		xit('should call returnVehicleData with the correct parameters', async () => {
			//Setup
			const mockVehicleData = await vehicles.results
			const returnVehicleData = jest.fn()
			const getVehicle = jest.fn(() => {
				returnVehicleData(mockVehicleData)
			})
			//Execution
			getVehicle()
			//Expectation
			expect(returnVehicleData).toHaveBeenCalledWith(mockVehicleData)
		})
	})
})