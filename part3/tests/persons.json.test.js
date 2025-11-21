const { test, describe, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('check header', () => {

  test('all persons are returned', async () => {
    const response = await api.get('/api/persons')

    assert.strictEqual(response.body.length, 5)
  }),

  test('a specific note is within the returned persons', async () => {
    const response = await api.get('/api/persons')

    const names = response.body.map(e => e.name)
    assert.strictEqual(names.includes('Ibrohim'), true)
  })
})

describe('check with supertest persons', () => {
  test('persons are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})


after(async () => {
  await mongoose.connection.close()
})