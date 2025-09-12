import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] =useState('')

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
        phoneNumber:''|| phoneNumber
    }

    setPersons(persons.concat(newObject))
    
    setNewName('')
    setPhoneNumber('')
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
      {persons.map(person =>
       <Person key={person.name} person={person} /> 
       )}
      </div>
    </div>
  )
}

export default App