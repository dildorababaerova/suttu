import { useState, useEffect } from 'react'
import coutriesService from './services/countries'
import Country from './components/Country'
import CountryDetail from './components/CountryDetail'

const App =() => {

const [countries, setCountries]=useState([])
const [searchCountry, setSearchCountry] = useState('')
const [country, setCountry] = useState('')


useEffect(()=>{
    coutriesService
    .getAll()
    .then(allCoutry =>{
        setCountries(allCoutry)
    })
    }, [])



const handleDetail = (country) => {
  setCountry(country)
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

        {country && <CountryDetail country={country} />}
    </div>
)
}

export default App