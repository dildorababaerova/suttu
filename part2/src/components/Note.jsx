const Note = ({note}) => {
  console.log('note', note);
  
  return(
    <li>{note.content}</li>
  )
}

export default Note