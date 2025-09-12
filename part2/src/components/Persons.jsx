import Person from './Person'

const Persons = ({persons, searchName}) => {
    const filterName = persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
    );
    return (
     <div>
        {filterName.map(person =>
        <Person key={person.name} person={person} /> 
        )}
        </div>

    )
}

export default Persons