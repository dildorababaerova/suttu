import { useState, useEffect } from 'react'
import coutriesService from './services/countries'
import Country from './components/Country'
import CountryDetail from './components/CountryDetail'

const App =() => {

const [countries, setCountries]=useState([])
const [searchCountry, setSearchCountry] = useState('')
const [country, setCountry] = useState('')
// const [capital, setCapital] = useState('');
const [coordsList, setCoordsList] = useState(null);
const [forecast, setForecast] = useState(null)


useEffect(()=>{
    coutriesService
    .getAll()
    .then(allCountry =>{
        setCountries(allCountry)
    })
    }, [])



const handleDetail = (country) => {
  setCountry(country)
  if (!country.capital || country.capital.length === 0) return;
const capitalName = country.capital[0]; 
  coutriesService
  .getCoordinates(capitalName)
  .then(result => {
    if (!result) return;
    setCoordsList(result)
  
  coutriesService
  .getForecast(capitalName, result.lat, result.lon)
  .then(results => setForecast(results))
  })
}




const filterCountry=countries.filter(country=>country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))
console.log('Filtered', filterCountry);

return (
    <div>
        <input 
        type="text"
        value ={searchCountry} 
        onChange ={(e) =>setSearchCountry(e.target.value)}
        placeholder="Search country..." 
        />

        { (filterCountry.length===1)
        ? <CountryDetail  country={filterCountry[0]}/>
        : (filterCountry.length>10)
        ? <div>Too many matches, specify another filter</div>
        : filterCountry.map(country=> (
        <Country key ={country.cca3} country={country} handleDetail= {handleDetail}/>))
        }

        {country && <CountryDetail country={country} forecast ={forecast} coords= {coordsList} />}
    </div>
)
}

export default App