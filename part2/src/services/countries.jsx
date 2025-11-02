import axios from 'axios';

// Base URL for the REST Countries API
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

/**
 * Fetch all countries data
 * Returns an array of country objects from the API
 */
const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data);
};

/**
 * Fetch coordinates (latitude & longitude) for a given city name
 */
const getCoordinates = (city) => {
  // encodeURIComponent() is a built-in JS function
  // It safely encodes special characters (like spaces or symbols)
  // Example: "New York" -> "New%20York"
  // This ensures the URL is valid and won't break
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;

  // Make a GET request to the Open-Meteo geocoding API
  return (
    axios.get(url)
      .then((response) => {
        // The API returns a JSON object that includes "results"
        // Example of response.data:
        // {
        //   "results": [
        //     {
        //       "name": "Helsinki",
        //       "latitude": 60.16952,
        //       "longitude": 24.93545,
        //       ...
        //     }
        //   ]
        // }
        //
        // We use response.data.results because it's where
        // the array of found locations is stored by the API.
        if (response.data.results && response.data.results.length > 0) {
          return {
            city,
            lat: response.data.results[0].latitude,
            lon: response.data.results[0].longitude,
          };
        }
        // If there are no results, return null
        return null;
      })
  );
};

// Example usage: Get coordinates for Helsinki
getCoordinates("Helsinki").then(fin => {
  console.log('FIN', fin);
});

/**
 * Fetch weather forecast for a city using its coordinates
 */
const getForecast = (city, lat, lon) => {
  // Construct the API URL using the coordinates
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  // Make a GET request to the forecast API
  return (
    axios.get(url).then((response) => ({
      city,
      daily: response.data.daily, // Extract daily weather data
    }))
  );
};

// Example usage: Get forecast for Helsinki
getForecast("Helsinki", 60.16952, 24.93545).then(fin => {
  console.log('Daily', fin);
});

// Export all functions so they can be used in other modules
export default { getAll, getCoordinates, getForecast };
