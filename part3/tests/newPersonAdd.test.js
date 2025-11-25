const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Person = require('../models/person')



beforeEach(async () => {
  await Person.deleteMany({})
  console.log('cleared')

  // The easiest way to handle the situation is by utilizing Mongoose's built-in method insertMany
  await Person.insertMany(helper.initialPersons)
})


//   await personObject.save()
//   better way of saving multiple objects to the database
//   const personObjects= helper.initialPersons
//     .map(person =>  new Person(person))
//   const promiseArray =personObjects.map(person => person.save())
//   await Promise.all(promiseArray)
//_____________________________________________________
//   saves the first two notes from the helper.initialNotes array into the database with two separate operations
//   let personObject = new Person(helper.initialPersons[0])
//   await personObject.save()
//   personObject = new Person(helper.initialPersons[1])
//_________________________________________

//____________________________
//In situations like this, the operations can be executed inside of a for...of block, that guarantees a specific execution order.
// beforeEach(async () => {
//   await Person.deleteMany({})

//   for (let person of helper.initialPersons) {
//     let personObject = new Person(person)
//     await personObject.save()
//   }
// })

console.log('initial persons added to DB')


test('all persons are returned', async () => {
  const response = await helper.personInDb()

  assert.strictEqual(response.length, helper.initialPersons.length)
})

test('a specific person can be viewed', async () => {
  const personsAtStart = await helper.personInDb()
  const personToView = personsAtStart[0]


  const resultPerson = await api
    .get(`/api/persons/${personToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log('RESULT PERSON', resultPerson.body)

  assert.deepStrictEqual(resultPerson.body, personToView )
})
test('a person can be deleted', async () => {
  const personsAtStart = await helper.personInDb()
  const personToDelete = personsAtStart[0]

  await api
    .delete(`/api/persons/${personToDelete.id}`)
    .expect(204)

  const personsAtEnd = await helper.personInDb()
  console.log('deleted')

  const names = personsAtEnd.map(n => n.name)
  assert(!names.includes(personToDelete.name))

  assert.strictEqual(personsAtEnd.length, helper.initialPersons.length - 1)
})

describe('test for adding a new person', () => {
  test('a valid person can be added ', async () => {
    const newPerson = {
      name: 'Pekka Tatari',
      phoneNumber: '333-999999',
    }

    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const personsAtEnd = await helper.personInDb()
    console.log('saved')

    const names = personsAtEnd.map(r => r.name)

    assert.strictEqual(personsAtEnd.length, helper.initialPersons.length + 1)

    assert(names.includes('Pekka Tatari'))
  })
  test('person without name is not added', async () => {
    const newPerson = {
      phoneNumber: '787-787878'
    }

    await api
      .post('/api/persons')
      .send(newPerson)
      .expect(400)

    const response = await helper.personInDb()

    assert.deepStrictEqual(response.length, helper.initialPersons.length)
  })
  test('persons are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})



after(async () => {
  await mongoose.connection.close()
})