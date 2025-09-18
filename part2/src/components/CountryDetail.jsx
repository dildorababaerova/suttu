const CountryDetail =({country}) =>{
    const language=Object.values(country.languages)

    const flagStyle = {
        width: '100px',
        height: '70px' 
    }

    return (
        <div>
            <h1>{country.name.common} </h1>
            <div>Capital: {country.capital ? country.capital.join(', ') : 'not capital'}</div>
            <div>Area{country.area} </div>
            <h1>Languages</h1>
            {language.map(lang => <li key ={lang}>{lang}</li>)}
            <br />
            <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                style={flagStyle}
            />
        </div>
    )
}

export default CountryDetail