const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let persons= [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/info', (req, res) => {
   const now = new Date()
    res.send(`<div>Phonebook has info ${persons.length} people</div
      <div>${now.toString()} </div
      `)
})
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
  
})

const getId =() =>{
  const maxId = persons.length>0
  ? Math.max(...persons.map(person => Number(person.id)))
  :0
  return String(maxId+Math.random(1, 100).toFixed(2))
}
console.log(getId())

app.post('/api/persons', (req, res) =>{
  const body =req.body
  console.log("BODY",body)
  if (!body.name|| !body.number) {
    return res.status(400).json({error: "person name or number missing"})
  } 
  const newPerson ={
    name: body.name,
    number: body.number,
    id: getId(),
  }
  const exists=persons.find(p => p.name===newPerson.name || p.number===newPerson.number)
  if (exists) {
    return res.status(400).json({error: "person name or person number must be unique"}) 
  } 
    persons =persons.concat(newPerson)
    
  res.status(201).json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)