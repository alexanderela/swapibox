import * as API from './apiCalls'

//Get films
export const getMovie = async () => {
	const randomEpisode = Math.round(Math.random() * 6 + 1)
	const movieUrl = ("https://swapi.co/api/films/")
	const movieData = await API.fetchData(movieUrl)
	const movieDataCollection = await movieData.results[randomEpisode]
	const film = await returnMovieInfo(movieDataCollection)
	return film
}

export const returnMovieInfo = async (film) => {
	return ({
		opening_crawl: film.opening_crawl,
 		episode_id: film.episode_id,
 		title: film.title,
 		date: film.release_date.slice(0,4)
	})
}

//Get people
export const getPerson = async () => {
	const peopleUrl = ("https://swapi.co/api/people/")
	const peopleData = await API.fetchData(peopleUrl)
	const peopleDataCollection = await returnPeopleData(peopleData.results)
	return Promise.all(peopleDataCollection)
}

export const returnPeopleData = async (personCollection) => {
	const peoplePromises = await personCollection.map( async person => {
	const { planetName, planetPop } = await getHomeWorld(person)
	const { speciesName, language } = await getSpecies(person)

	return {
		name: person.name,
		id: person.name,
		isFavorite: false,
		type: 'people',
		properties: [
			{header: 'Homeworld: ', text: `${planetName}`},
			{header: 'Species: ', text: `${speciesName}`},
			{header: 'Population: ', text: `${planetPop}`},
			{header: 'Language: ', text: `${language}`}
		] 
	}
})
	return Promise.all(peoplePromises)
}

export const getHomeWorld = async (person) => {
	const personHomeUrl = person.homeworld
	const homeWorldData = await API.fetchData(personHomeUrl)
	const homeWorld = {
		planetName: homeWorldData.name,
		planetPop: homeWorldData.population
	}
	return homeWorld
}

export const getSpecies = async (person) => {
	const speciesUrl = person.species[0]
	const speciesData = await API.fetchData(speciesUrl)
	const species = {
		speciesName: speciesData.name,
		language: speciesData.language
	}
	return species
}

//Get planets
export const getPlanet = async () => {
	const planetUrl = ("https://swapi.co/api/planets/")
	const planetData = await API.fetchData(planetUrl)
	const planetDataCollection = await returnPlanetData(planetData.results)
	return Promise.all(planetDataCollection)
}

export const returnPlanetData = async (planetCollection) => {
	const planetPromises = await planetCollection.map( async planet => {
		return {
			name: planet.name,
			id: planet.name,
			isFavorite: false,
			type: 'planets',
			properties: [
				{header: 'Terrain: ', text: `${planet.terrain}`},
				{header: 'Population: ', text: `${planet.population}`},
				{header: 'Climate: ', text: `${planet.climate}`},
				{header: 'Residents: ', text: `${await getResidents(planet.residents)}`}
			]
		}
	})
	return Promise.all(planetPromises)
}

export const getResidents = async (residentUrls) => {
	const tenantPromises = residentUrls.map(async residentUrl => {
		const residentData = await API.fetchData(residentUrl)
		return residentData.name
	})
	return await Promise.all(tenantPromises)
}

//Get vehicles
export const getVehicle = async () => {
	const vehicleUrl = ("https://swapi.co/api/vehicles/")
	const vehicleData = await API.fetchData(vehicleUrl)
	const vehicleDataCollection = await returnVehicleData(vehicleData.results)
	return Promise.all(vehicleDataCollection)
}

export const returnVehicleData = async (vehicleCollection) => {	
	const vehiclePromises = await vehicleCollection.map( async vehicle => {
		return {
			name: vehicle.name,
			id: vehicle.name,
			isFavorite: false,
			type: 'vehicles',
			properties: [
				{header: 'Model: ', text: `${vehicle.model}`},
				{header: 'Class: ', text: `${vehicle.vehicle_class}`},
				{header: 'Passengers: ', text: `${vehicle.passengers}`}
			]
		}
	})
	return Promise.all(vehiclePromises)
}
