import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] =useState('')
  const [searchName, setSearchName]= useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] =useState('')
  const [password, setPassword] =useState('')
  const [user, setUser] = useState(null)

  
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
      if (window.confirm(`${newName} is already added to phonebook, replase the old number with a new one?`)) {
      const updatedPerson = {...checkNames, phoneNumber}
      personService
      .update(checkNames.id, updatedPerson)
      .then((returnedNote)=>{
        setPersons(persons.map(person=> person.id===checkNames.id? returnedNote: person))
        setNewName('')
        setPhoneNumber('')
      })
      .catch(error => {
        setErrorMessage(`${newName} is already removed from server`)
        setTimeout(()=>{
        setErrorMessage(null)
          }, 5000)
        setPersons(persons.filter(person => person.id !== checkNames.id))
        setNewName('')
        setPhoneNumber('')
      })
    }
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
      setSuccessMessage(`${newObject.name} added`)
      setTimeout(()=>{
        setSuccessMessage(null)
      }, 5000)
      setNewName('')
      setPhoneNumber('')
    })
  }

  const toggleDeleteOf = (id) => {
    const person = persons.find(person => person.id===id)
    if (window.confirm(`Delete ${person.name}`)) {
    personService
    .deletePerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id != id))
      setSuccessMessage(`${person.name} deleted`)
      setTimeout(()=>{
        setSuccessMessage(null)
      }, 5000)
    })
    .catch(error =>{
      setErrorMessage(`${person.name} already deleted`)
      setTimeout(()=> {
        setErrorMessage(null)
          }, 5000)
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


   const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password}) 
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Logged with user ${user.username.toString()}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000) 
    } catch {
      setErrorMessage('wrong credentals')
      setTimeout(() =>{
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
      <form onSubmit = {handleLogin}>
        <div>
          <label>
            username 
            <input 
            type='text'
            value={username}
            onChange={({target})=> setUsername(target.value) }
            />
          </label>
          <br />
          <label>
            password
            <input 
            type='password'
            value={password}
            onChange={({target})=> setPassword(target.value) }
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
  )

  const phoneBookContent = () => (
    <div> 
         <p>{user.name} logged in</p>
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>

      { user? phoneBookContent():loginForm()}
      
      
    </div>
  )
}

export default App