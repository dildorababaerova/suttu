import {useState} from 'react'


const App= () => {
  const[count, setCount] =useState(0)
  const[minus, setMinus] =useState(0)
  const[plus, setPlus] =useState(0)
  const[double, setDouble] =useState(0)
  const[history, setHistory]=useState([])
  
  const update = (changes) => setHistory((prev) => ([...prev,changes ]));
  const handleCounter=()=>{
  setCount(prev => prev + 1)
  setPlus( prev => prev + 1)
  update('+')
}

  const handleReset =() =>{
    setCount(0)
    setDouble(0)
    setMinus(0)
    setPlus(0)
    setHistory([])
    update('reset')
  }
  const handleMinus=()=>{
    count > 0 && setCount(prev => prev - 1)
    setMinus( prev => prev + 1)
    update('-')
  }

  const handleDouble = () => {
    count > 0 && setCount(prev => prev * 1)
    setDouble( prev => prev + 1)
    update('X2')
  }

  const getStyle = () => {
    if (count===10) return {color: "red"}
    if (count >= 20) return{color: "blue"}
  }


  
  return (
    <div>
      <p style={getStyle()}></p>
      <button onClick = {() => count ===10? handleReset():handleCounter()}>{count===10?"Reset": "+" }</button>
      <button onClick = {handleMinus} disabled={count <= 0}>-</button>
      <button onClick = {handleDouble} disabled={count <= 0}> x2 </button>
      <div>
        <li>clicked - button {minus}</li>
        <li> clicked + button {plus}</li>
        <li>clicked x2 button {double}</li>
        <li>History: {history}</li>

      </div>
    </div>
  ) 


}

export default App
