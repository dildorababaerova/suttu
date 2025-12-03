const mongoose = require('mongoose')
const User = require('./models/user')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB')

    // Найти пользователя
    const user = await User.findOne({ username: 'mluukkai' })
    if (user) {
      console.log('Before cleanup:', user.persons)

      // Оставляем только первый блог (или очищаем полностью)
      user.persons = [] // или [] чтобы удалить все
      await user.save()

      console.log('After cleanup:', user.persons)
    }

    mongoose.connection.close()
  })
  .catch(err => console.error(err))
