const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Person = require('../models/person')

const initialPersons =[
  {
    name: 'Timur',
    phoneNumber: '111-1111',
  },
  {
    name: 'Ibrohim',
    phoneNumber: '777-7777',
  },

]

beforeEach(async () => {
  await Person.deleteMany({})
  let personObject = new Person(initialPersons[0])
  await personObject.save()
  personObject = new Person(initialPersons[1])
  // If many objects to insert to DB
  // await Person.insertMany(initialPersons)

  await personObject.save()
})

describe('check header /api/persons/ ', () => {

  test('all persons are returned', async () => {
    const response = await api.get('/api/persons')
    console.log('PERSON', response.body)

    assert.strictEqual(response.body.length, 2)
  })

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