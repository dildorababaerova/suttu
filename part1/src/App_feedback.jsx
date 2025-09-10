import { useState } from 'react'


const StatisticLine = ({ text, value }) => (
  <tr>
    <td className="rowText">{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  
  return(
    <table >
      <tbody>
      <StatisticLine text="good" value ={good} />
      <StatisticLine text="neutral" value ={neutral} />
      <StatisticLine text="bad" value ={bad} />
      <StatisticLine text="average" value ={average.toFixed(2)} />
      <StatisticLine text="total" value ={total} />
      <StatisticLine text="positive" value ={`${positive.toFixed(2)} %`} />
      </tbody>
   </table>
  )
}


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [value, setValue]= useState(0) 
  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)
  
  // const total=good+neutral+bad 
  // const average=total>0?(good-bad)/total:0
  // const positive=total>0?good/total*100:0
  
  // const stat ={good, neutral, bad, total, average, positive}

const handleOnClick = (value) => {
  onClick = (()=> setValue(value + 1))
}

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleOnClick(good)} text='good' />
      <Button onClick={handleOnClick(neutral)} text='neutral' />
      <Button onClick={handleOnClick(bad)} text='bad' />
       <h2>statistics</h2>
       {(total === 0) ? (<div>No  feedback given</div>
        ):<Statistics {...stat}/>}
    </div>
  )
}
export default App