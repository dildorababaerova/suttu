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
  const user = req.user
  if(!user) {
    return res.status(401).json({ error: 'token missing or invalid for delete' })
  }

  const person = await Person.findById(req.params.id)
  if(!person) {
    return res.status(404).json({ error: 'blog not found for delete' })
  }

  if (!person.user) {
    return res.status(400).json({ error: 'person has no owner information' })
  }

  if (person.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'only user can delete person' })
  }

  await Person.findByIdAndDelete(req.params.id)

  const filteredPersons = user.persons.filter(
    id => id.toString() !== person._id.toString()
  )
  user.persons = filteredPersons
  await user.save()
  res.status(204).end()
})





// POST new person
personsRouter.post('/', async (req, res) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const body = req.body
    if (!body.name || !body.phoneNumber) {
      return res.status(400).json({ error: 'name and phone number required' })
    }

    // Проверяем, нет ли у этого пользователя такой же записи
    const existingPerson = await Person.findOne({
      user: user._id,
      $or: [
        { name: body.name },
        { phoneNumber: body.phoneNumber }
      ]
    })

    if (existingPerson) {
      return res.status(400).json({
        error: 'you already have a contact with this name or number'
      })
    }

    const newPerson = new Person({
      name: body.name,
      phoneNumber: body.phoneNumber,
      user: user._id
    })

    const savedPerson = await newPerson.save()
    user.persons.push(savedPerson._id)
    await user.save()

    res.status(201).json(savedPerson)

  } catch (error) {
    console.error('Error creating person:', error)
    res.status(500).json({ error: 'internal server error' })
  }
})

personsRouter.put('/:id', async (req, res) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const person = await Person.findById(req.params.id)
  if (!person) {
    return res.status(404).json({ error: 'person not found' })
  }
  if (!person.user) {
    return res.status(400).json({ error: 'person has no owner' })
  }


  if (!person.user.equals(user._id)) {
    return res.status(403).json({ error: 'only user can update' })
  }

  const { name, phoneNumber } = req.body
  if (name === undefined && phoneNumber === undefined) {
    return res.status(400).json({ error: 'no data provided for update' })
  }

  if (name || phoneNumber) {
    const existingPerson = await Person.findOne({
      _id: { $ne: req.params.id }, // исключаем текущую запись
      user: user._id,
      $or: [
        ...(name ? [{ name }] : []),
        ...(phoneNumber ? [{ phoneNumber }] : [])
      ]
    })

    if (existingPerson) {
      return res.status(400).json({
        error: 'name or phone number must be unique for your contacts',
        field: existingPerson.name === name ? 'name' : 'phoneNumber'
      })
    }
  }

  // Обновляем запись
  const updateData = {}
  if (name !== undefined) updateData.name = name
  if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber


  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true,
      runValidators:true,
      context: 'query'
    }
  )

  if (!updatedPerson) {
    return res.status(404).json({ error: 'updated person not found' })
  }

  res.status(200).json(updatedPerson)
})

module.exports =personsRouter


// /info

// app.get(/^(?!\/api).*/, (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'part2','dist', 'index.html'))
// })

// Delete with session
// personsRouter.delete('/:id', async (req, res) => {
//   const session = await mongoose.startSession()
//   session.startTransaction()

//   try {
//     const user = req.user
//     if(!user) {
//       await session.abortTransaction()
//       session.endSession()
//       return res.status(401).json({ error: 'token missing or invalid for delete' })
//     }

//     const person = await Person.findById(req.params.id).session(session)
//     if(!person) {
//       await session.abortTransaction()
//       session.endSession()
//       return res.status(404).json({ error: 'person not found for delete' })
//     }

//     if (!person.user) {
//       await session.abortTransaction()
//       session.endSession()
//       return res.status(400).json({ error: 'person has no owner information' })
//     }

//     if (!person.user.equals(user._id)) {
//       await session.abortTransaction()
//       session.endSession()
//       return res.status(403).json({ error: 'only user can delete person' })
//     }

//     // Удаляем персона
//     await Person.findByIdAndDelete(req.params.id).session(session)

//     // Удаляем из массива пользователя, если есть
//     user.persons.pull(person._id)
//     await user.save({ session })

//     // Фиксируем транзакцию
//     await session.commitTransaction()
//     session.endSession()

//     res.status(204).end()

//   } catch (error) {
//     // Откатываем транзакцию при ошибке
//     await session.abortTransaction()
//     session.endSession()

//     console.error('Delete error:', error)
//     res.status(500).json({ error: 'server error during deletion' })
//   }
// })

