import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // Индекс выбранного анекдота
  const [selected, setSelected] = useState(0)

  // Голоса для каждого анекдота
  const [votes, setVotes] = useState(anecdotes.map(() => 0))

  // Случайная цитата
  const handleSelectedAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  // Голосование за текущую цитату
  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h2>Random Anecdote</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleSelectedAnecdote}>next anecdote</button>
      <button onClick={handleVote}>vote</button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {maxVotes} votes</p>
      {/* {anecdotes.map((text, i) => 
        votes[i] === maxVotes && maxVotes > 0 ? (
      <div key={i}>
        <p>{text}</p>
        <p>has {votes[i]} votes</p>
      </div>
  ) : null
)} */}
</div>
  )
}

export default App
