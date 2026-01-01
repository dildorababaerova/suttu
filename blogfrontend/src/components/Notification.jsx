// const Notification = ({ errorMessage, successMessage }) => {
//   const message = errorMessage||successMessage
//   if (!message) {
//     return null
//   }

//   const notification= {
//     fontStyle: 'italic',
//     background: 'lightgrey',
//     fontSize: '20px',
//     borderStyle: 'solid',
//     borderRadius: '5px',
//     padding: '10px',
//     marginBottom: '10px'
//   }



//   const style ={
//     ...notification,
//     color: errorMessage ? 'red': 'green'
//   }

//   return <div style = {style}>{message}</div>

// }

// export default Notification


const Notification = ({ errorMessage, successMessage }) => {
  const message = errorMessage||successMessage
  if (!message) {
    return null
  }



  return (
    <div
      className= {`notification ${errorMessage? 'error' :'success'}`}>
      {message}
    </div>
  )}

export default Notification