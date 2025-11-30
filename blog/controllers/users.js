const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  if(!passwordHash || passwordHash<4) {
    return response.status(401).json({ error:'password missed or must be at least 3 characters' })
  }
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports= usersRouter