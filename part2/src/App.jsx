import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


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
       < Persons persons ={persons} searchName={searchName} /> 
    </div>
  )
}

export default App