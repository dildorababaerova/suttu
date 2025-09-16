import Person from './Person'

const Persons = ({persons, searchName, toggleDeleteOf}) => {
    const filterName = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
    );
    return (
     <div>
        {filterName.map(person =>
        <Person 
        key={person.id} 
        person={person}
        toggleDelete={()=>toggleDeleteOf(person.id)} 
        /> 
        )}
        </div>

    )
}

export default Persons