import axios from 'axios'


const baseUrl= 'https://studies.cs.helsinki.fi/restcountries/api';
      

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCoordinates=(city) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;
    return (
    axios.get(url)
    .then((response) => {
        if (response.data.results && response.data.results.length > 0) {
          return {
            city,
            lat: response.data.results[0].latitude,
            lon: response.data.results[0].longitude,
          };
        } return null;
      })
    )}


 getCoordinates("Helsinki").then(fin => {
   console.log('FIN', fin)
 })


const getForecast =(city, lat, lon) =>{
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  return (
    axios.get(url).then((response) => (
      {
        city,
        daily: response.data.daily,
      }
    )))
    }

   getForecast("Helsinki", 60.16952, 24.93545).then(fin => {
   console.log('Daily', fin)
 }) 


export default {getAll, getCoordinates, getForecast}