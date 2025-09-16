import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] =useState('')
  const [searchName, setSearchName]= useState('')

  
 useEffect(() =>{
    personService
    .getAll()
    .then(initialNote =>{
        setPersons(initialNote)
        console.log('Response', initialNote)
    })
 }, []
)
  
  const addPerson = (e)=>{
    e.preventDefault()

    const checkNames = persons.find(person=> person.name===newName)

    if (checkNames) {
      alert(`${newName} is already added to phonebook`)
      return
    }


    const newObject ={
        name:newName,
        // id:persons.length+1,
        phoneNumber: phoneNumber
    }

    personService
    .create(newObject)
    .then(returnedNote => {
      console.log("Reterned", returnedNote)
      setPersons(persons.concat(returnedNote))
      setNewName('')
      setPhoneNumber('')
    })
  }

  const toggleDeleteOf = (id) => {
    const person = persons.find(person => person.id===id)
    console.log('person should deleted soon',person.id)
    if (window.confirm(`Delete ${person.name}`))
    {personService
    .deletePerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id != id))
    })
    .catch(error =>{
      alert(`${person.name} already deleted`)
      setPersons(persons.filter(person => person.id != id))
    })
  }

  }
  
  const handleSearch =(e) => {
    setSearchName(e.target.value)
  }  

  const handleNewName =(e) => {
    setNewName(e.target.value)
  }

  const handlePhoneNumber =(e) =>{
    setPhoneNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
          <Filter 
          handleSearch={handleSearch} 
          searchName={searchName}
          />

        <h1>add a new</h1>
          <PersonForm 
          addPerson={addPerson} 
          newName={newName} 
          phoneNumber={phoneNumber} 
          handleNewName={handleNewName} 
          handlePhoneNumber={handlePhoneNumber}        
          />
        
      <h2>Numbers</h2>
       < Persons 
        persons ={persons} 
        searchName={searchName}
        toggleDeleteOf={toggleDeleteOf}
       /> 
    </div>
  )
}

export default App