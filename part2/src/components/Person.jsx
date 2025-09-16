const Person =({person, toggleDelete})=>{
    return (
        <li>
            {person.name} 
            {person.phoneNumber}
            <button onClick ={toggleDelete}>delete</button>
        </li>
    )
}

export default Person