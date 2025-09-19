const Country = ({country, handleDetail}) =>{
    return(
        <li>{country.name.common}
        <button onClick={() => {handleDetail(country)}}>Show</button>
         </li>
    )
}

export default Country