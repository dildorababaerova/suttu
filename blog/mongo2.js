const mongoose = require('mongoose')
const User = require('./models/user')
const config = require('./utils/config')

mongoose.connect(config.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB')

    // Найти пользователя
    const user = await User.findOne({ username: 'root' })
    if (user) {
      console.log('Before cleanup:', user.blogs)

      // Оставляем только первый блог (или очищаем полностью)
      user.blogs = [] // или [] чтобы удалить все
      await user.save()

      console.log('After cleanup:', user.blogs)
    }

    mongoose.connection.close()
  })
  .catch(err => console.error(err))
