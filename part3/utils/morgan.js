const morgan = require('morgan')
const chalk = require('chalk')
const Person = require('../models/person')

//-------------------------
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


const morganToken = morgan(customFormat)
module.exports = morganToken