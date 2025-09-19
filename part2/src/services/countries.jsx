import axios from 'axios'


const baseUrl= 'https://studies.cs.helsinki.fi/restcountries/api'


const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather=(capital) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
    const request = axios.get(`${baseUrl}/name/${country}`)
    return request.then(response=>response.data)
}

getCountry("finland").then(fin => {
  console.log('FIN', fin)
})
export default {getAll, getCountry}