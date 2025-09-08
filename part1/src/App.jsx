import { useState } from 'react'


const StatisticLine = (props) => {
  return(
    <div>
      {props.text} {props.value} {props.text==="positive"?"%":""}
    </div>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="average" value ={props.average} />
      <StatisticLine text="total" value ={props.total} />
      <StatisticLine text="positive" value ={props.positive} />
    </div>
  )
}


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const stat ={good, neutral, bad, total, average, positive}

  const handleGoodClick = () => {
    const goodFeedBack=good+1
    setGood(goodFeedBack)
    const totalFeedBack=goodFeedBack+neutral+bad 
    setTotal(totalFeedBack)
    const averageFeedBack=((goodFeedBack-bad)/totalFeedBack).toFixed(2)
    setAverage(averageFeedBack)
    const positiveFeedBack=(goodFeedBack/totalFeedBack*100).toFixed(2)
    setPositive(positiveFeedBack)

  }
  
  
  const handleNeutralClick = () => {
    const neutralFeedBack=neutral+1
    setNeutral(neutralFeedBack)
    const totalFeedBack=good+neutralFeedBack+bad 
    setTotal(totalFeedBack)
    const averageFeedBack=((good-bad)/totalFeedBack).toFixed(2)
    setAverage(averageFeedBack)
    const positiveFeedBack=(good/totalFeedBack*100).toFixed(2)
    setPositive(positiveFeedBack)
  }

  const handleBadClick = () => {
    const badFeedBack=bad+1
    setBad(badFeedBack)
    const totalFeedBack=good+neutral+badFeedBack 
    setTotal(totalFeedBack)
    const averageFeedBack=( (good-badFeedBack)/totalFeedBack).toFixed(2)
    setAverage(averageFeedBack)
    const positiveFeedBack=(good/totalFeedBack*100).toFixed(2)
    setPositive(positiveFeedBack)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
       <h2>statistics</h2>
      <Statistics {...stat}
      />
    </div>
  )
}
export default App