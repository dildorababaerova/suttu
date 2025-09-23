const Country = ({country, handleDetail, forecast, coordsList, capital}) =>{
    return(
        <li>{country.name.common}
        <button onClick={() => {handleDetail(country)}}>Show</button>
         </li>
    )
}

export default Country