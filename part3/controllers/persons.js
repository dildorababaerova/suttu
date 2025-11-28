const personsRouter =require('express').Router()
const Person = require('../models/person')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// -------------------------
// Function
// -------------------------

// Генерация уникального ID
// const getId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(p => Number(p.id)))
//     : 0
//   return String(maxId + 1)
// }

// -------------------------
// Routers
// -------------------------




personsRouter.get('/info', async(req, res) => {
  const now = new Date()
  const personCount = await Person.countDocuments({})
  res.send(`
    <div>Phonebook has info for ${personCount} people</div>
    <div>${now.toString()}</div>
  `)
})

// GET all
personsRouter.get('/', async (req, res) => {
  const persons = await Person.find({}).populate('user', { name:1 })
  res.json(persons)
})

// GET by id
personsRouter.get('/:id', async (req, res) => {
  const personId= await Person.findById(req.params.id)
  if (personId )
  {res.json(personId)
  } else {
    res.status(404).end()
  }
})

// DELETE by id
personsRouter.delete('/:id', async (req, res) => {
  const personIdDelete = await Person.findByIdAndDelete(req.params.id)
  if (personIdDelete) {
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}



// POST new person
personsRouter.post('/',  async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if(!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(400).json({ error:'userID missing or not valid' })
  }

  if (!body.name || !body.phoneNumber) {
    return res.status(400).json({ error: 'person name or number missing' })
  }

  // Проверка уникальности
  const personFindOne = await Person.findOne({ $or: [{ name: body.name }, { phoneNumber: body.phoneNumber }] })
  if (personFindOne) {
    return res.status(400).json({ error: 'name or number must be unique' })
  }

  // Если уникальный — создаём новый документ
  const newPerson = new Person({
    name: body.name,
    phoneNumber: body.phoneNumber,
    user:user._id
  })

  const newPersonSaved = await newPerson.save()
  user.persons = user.persons.concat(newPersonSaved._id)
  await user.save()
  if (newPersonSaved) {
    res.status(201).json(newPersonSaved)
  }
})

module.exports =personsRouter


// /info

// app.get(/^(?!\/api).*/, (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'part2','dist', 'index.html'))
// })

