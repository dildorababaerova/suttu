const PersonForm =({addPerson, newName, phoneNumber, handleNewName, handlePhoneNumber}) => {

    return (
        <div>
         <form onSubmit={addPerson}>
          <div>
            name: <input 
            value ={newName}
            onChange = {handleNewName}
            />
          </div>
        <br/>
          <div>
            number: <input 
            value ={phoneNumber}
            onChange = {handlePhoneNumber}
            />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>   
        </div>
    )

}

export default PersonForm



