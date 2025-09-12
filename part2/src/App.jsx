import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] =useState('')
  const [searchName, setSearchName]= useState('')

  console.log(persons)

  
  const addPerson = (e)=>{
    e.preventDefault()

    const checkNames = persons.find(person=> person.name===newName)

    if (checkNames) {
      alert(`${newName} is already added to phonebook`)
      return
    }


    const newObject ={
        name:newName,
        id:persons.length+1,
        phoneNumber: phoneNumber
    }

    setPersons(persons.concat(newObject))
    
    setNewName('')
    setPhoneNumber('')
  }

  const filterName = persons.filter(person =>
  person.name.toLowerCase().startsWith(searchName.toLowerCase())
);

  

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
        filter shown with <input 
        value= {searchName}
        onChange={(e)=> setSearchName(e.target.value)}
        />
        </div>

        <h1>add a new</h1>

        <form onSubmit={addPerson}>
          <div>
            name: <input 
            value ={newName}
            onChange = {(e) => setNewName(e.target.value)}
            />
          </div>
        <br/>
          <div>
            number: <input 
            value ={phoneNumber}
            onChange = {(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {filterName.map(person =>
       <Person key={person.name} person={person} /> 
       )}
      </div>
    </div>
  )
}

export default App