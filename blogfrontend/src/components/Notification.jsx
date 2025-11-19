const Notification = ({ errorMessage, successMessage }) => {
    const message = errorMessage||successMessage
    if (!message) {
        return null
    }

  const notification= {
    fontStyle: 'italic',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

//   const success = {
//     color: 'green',
    
//   }
//   const error= {
//     color: 'red',
    
//   }
  
  const style ={
    ...notification,
    color: errorMessage ? 'red': 'green'
  } 

  return <div style = {style}>{message}</div>

}

export default Notification