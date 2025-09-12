import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

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
        id:persons.length+1
    }

    setPersons(persons.concat(newObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value ={newName}
          onChange = {(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map(person =>
       <Person key={person.name} person={person} /> 
       )}
      </div>
    </div>
  )
}

export default App