const Person = require('../models/person')
const User = require('../models/user')

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

const nonExistingId = async () => {
  const person = new Person({ name: 'willremovethissoon' })
  await person.save()
  await person.deleteOne()

  return person._id.toString()
}

const personInDb = async () => {
  const persons = await Person.find({})
  return persons.map(person => person.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialPersons,
  nonExistingId,
  personInDb,
  usersInDb,
}