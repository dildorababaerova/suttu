const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const chalk = require('chalk') // убедись, что установлен: npm install chalk@4
require('dotenv').config()
const app = express()
const Person = require('./models/person')

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))



// -------------------------
// Morgan кастомные токены
// -------------------------

// Токен для Authorization
morgan.token('auth', (req) => {
  if (!req || !req.headers) return '-' // защита от undefined
  const auth = req.headers['authorization']
  return auth ? chalk.blue(auth) : chalk.gray('-')
})

// Токен для тела запроса
morgan.token('body', (req) => {
  if (!req) return ''
  if (req.method === 'POST' || req.method === 'PUT'|| req.method === 'GET') {
    return chalk.green(JSON.stringify(req.body))
  }
  return ''
})
morgan.token('resbody', (req, res) => {
  if (req.method === 'GET' && req.url === '/api/persons') {
    return chalk.green(JSON.stringify(Person))
  }
  return ''
})
// morgan.token('clientIp', req => req.ip || req.connection.remoteAddress)
morgan.token('query', req => JSON.stringify(req.query))
morgan.token('date-time', () => new Date().toLocaleString())
morgan.token('auth', req => req.headers['authorization'] || '')

// Кастомный формат лога
const customFormat = (tokens, req, res) => {
  return [
    chalk.yellow(tokens.method(req, res)),           // Метод цветом
    chalk.cyan(tokens.url(req, res)),               // URL цветом
    chalk.magenta(tokens.status(req, res)),         // Статус цветом
    tokens.res(req, res, 'content-length'),         // Размер ответа
    '-', 
    chalk.gray(tokens['response-time'](req, res) + ' ms'), // Время ответа
    chalk.gray(tokens['date-time'](req, res) + ' ms'), // Время ответа
    tokens.auth(req, res),                          // Authorization
    tokens.body(req, res),                           // Тело запроса
    tokens.resbody(req, res),                          // Тело запроса
    // tokens.clientIp(req, res),
    tokens.query(req, res),
    tokens.auth(req, res),
  ].join(' ')
}

// Подключаем Morgan
app.use(morgan(customFormat))

// -------------------------
// Данные
// -------------------------
// let persons = [
//   { id: '1', name: 'Arto Hellas', phoneNumber: '040-123456' },
//   { id: '2', name: 'Ada Lovelace', phoneNumber: '39-44-5323523' },
//   { id: '3', name: 'Dan Abramov', phoneNumber: '12-43-234345' },
//   { id: '4', name: 'Mary Poppendieck', phoneNumber: '39-23-6423122' }
// ]



// -------------------------
// Функции
// -------------------------

// Генерация уникального ID
const getId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => Number(p.id)))
    : 0
  return String(maxId + 1)
}

// -------------------------
// Роуты
// -------------------------

// /info
app.get('/api/info', (req, res) => {
  const now = new Date()
  res.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${now.toString()}</div>
  `)
})

// GET all
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons=> {
    res.json(persons)
  })
})

// GET by id
app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

// DELETE by id
app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        // Документ найден и удалён
        res.status(204).end()
      } else {
        // Документ с таким id не найден
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => {
      // Некорректный id или другая ошибка
      res.status(400).json({ error: 'malformatted id' })
    })
})

// POST new person
app.post('/api/persons', (req, res) => {
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
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
})

// -------------------------
// Старт сервера
// -------------------------
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(chalk.green(`Server running on port ${PORT}`))
})
