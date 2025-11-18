const personsRouter =require('express').Router()
const Person = require('../models/person')


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


personsRouter.get('/api/info', (req, res, next) => {
  const now = new Date()
  Person.countDocuments({})
    .then(count => {

      res.send(`
      <div>Phonebook has info for ${count} people</div>
      <div>${now.toString()}</div>
    `)
    })
    .catch(error => error(next))
})

// GET all
personsRouter.get('/', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
    .catch(error => next(error))
})

// GET by id
personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person )
    {res.json(person)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

// DELETE by id
personsRouter.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})


// POST new person
personsRouter.post('/', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.phoneNumber) {
    return res.status(400).json({ error: 'person name or number missing' })
  }

  // Проверка уникальности
  Person.findOne({ $or: [{ name: body.name }, { phoneNumber: body.phoneNumber }] })
    .then(exists => {
      if (exists) {
        return res.status(400).json({ error: 'name or number must be unique' })
      }

      // Если уникальный — создаём новый документ
      const newPerson = new Person({
        name: body.name,
        phoneNumber: body.phoneNumber
      })

      return newPerson.save()
    })
    .then(savedPerson => {
      // Если документ был создан — отправляем клиенту
      if (savedPerson) {
        res.json(savedPerson)
      }
    })
    .catch(error => next(error))
})

module.exports =personsRouter


// /info

// app.get(/^(?!\/api).*/, (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'part2','dist', 'index.html'))
// })

