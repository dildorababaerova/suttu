const Note = ({note, toggleImportance}) => {
  console.log('note', note);
  
  return(
    
    <li>{note.content}
    <button onClick={toggleImportance}>
      {note.important? "make not important":"make important"}
      </button>
    </li>

  )
}

export default Note