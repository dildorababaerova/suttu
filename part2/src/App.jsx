import Note from "./components/Note";


const App = (props) => {

  const {notes} = props
  console.log('notes', notes);
  

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note, id) => (
          < Note key={note.id} note={note} />
            
        ))}
      </ul>
    </div>
  )
}

export default App