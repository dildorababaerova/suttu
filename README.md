# suttu
`npm create vite@latest `

suttu:https://suttu-p215.onrender.com

when we use variable MONGO_DB to terminal WINDOWS PowerShell:$env:MONGODB_URI="your_connection_string_here"; npm run dev

cheking how IP used app

`netstat -aon | findstr LISTENING`

`npm install eslint @eslint/js --save-dev`
`npx eslint --init`
`npm install --save-dev @stylistic/eslint-plugin`


```js
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]

```

`npm install --save-dev chalk@4`
`npm install --save-dev shx`
`npm install cross-env`
`npm install --save-dev supertest `
The following command only runs the tests found in the tests/note_api.test.js file:
`npm test -- tests/note_api.test.js` // tested, works only this command in Windows
`npm test -- --test-name-pattern="a specific note is within the returned notes"`
`npm test -- --test-only`

200 OK — запрос выполнен успешно, данные возвращены (например, GET /api/persons).

201 Created — новый ресурс успешно создан (например, POST /api/persons).

204 No Content — запрос успешен, но тело ответа пустое (например, успешное удаление DELETE /api/persons/:id).

400 Bad Request — неверный запрос, например, отсутствуют обязательные поля (name или phoneNumber).

401 Unauthorized — не авторизован для доступа к ресурсу.

403 Forbidden — авторизован, но доступ запрещён.

404 Not Found — ресурс не найден (неверный путь или ID).

409 Conflict — конфликт, например, при попытке создать дубликат.

500 Internal Server Error — непредвиденная ошибка на сервере (например, сбой базы данных).

503 Service Unavailable — сервер временно недоступен (например, из-за нагрузки).

1️⃣ Lodash

_.groupBy(array, 'key') → группирует объекты по значению ключа.

_.map(grouped, (items, key) => ...) → перебирает сгруппированные данные; key — это имя группы.

_.sumBy(array, 'field') → суммирует числовое поле в массиве объектов.

_.maxBy(array, 'field') → находит объект с максимальным значением поля.

2️⃣ Mongoose & MongoDB

ObjectId → уникальный идентификатор документа, можно хранить в другом документе.

populate('field') → заменяет ObjectId на полный документ из другой коллекции.

Вложенные документы без _id → удобно для маленьких структур, но сложно ссылаться извне.

{ new: true } при findByIdAndUpdate() → возвращает обновлённый документ. await Blog.findByIdAndUpdate(blog.id, updatedBlog, { new: true })
3️⃣ Async/Await

await можно использовать только внутри async функции.

Ошибки промиса перехватываются через try/catch или, начиная с Express 5, автоматически попадают в middleware.

Promise.all(array) → ждёт выполнения всех промисов одновременно, возвращает массив результатов.

Последовательное выполнение промисов → через for...of с await внутри цикла.
4️⃣ Тестирование (SuperTest + Node assert)

.expect(200) / .expect(400) → проверка HTTP-статуса.

.expect('Content-Type', /application\/json/) → проверка формата ответа.

assert.strictEqual(a, b) → проверяет идентичность ссылок или примитивов.

assert.deepStrictEqual(obj1, obj2) → проверяет содержимое объектов/массивов.

nonExistingId() → создаёт ID, который точно не существует, для проверки 404.

helper.notesInDb() / helper.personsInDb() → возвращает объекты из БД в формате JSON (.toJSON()), удобно для сравнения.

```js
const handleLikeChange = (delta) => {
  const updatedBlog = {
    ...blog,
    likes: Math.max(0, blog.likes + delta) //
  }
// 2-version
//   const newLikes = blog.likes + delta
// const updatedBlog = {
//   ...blog,
//   likes: newLikes < 0 ? 0 : newLikes
// }

  blogService.update(blog.id, updatedBlog)
    .then(returnedBlog => {
      setBlog(returnedBlog)
    })
}
 ```
 `npm install bcrypt `

```js
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('./models/user')

// Регулярка для проверки пароля:
// минимум 8 символов, хотя бы одна заглавная, одна строчная, цифра и спецсимвол
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/

// Регулярка для проверки email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  // Проверка обязательных полей
  if (!username || !password) {
    return res.status(400).json({ error: 'username or password missing' })
  }

  // Проверка формата username/email
  if (!emailRegex.test(username)) {
    return res.status(400).json({ error: 'invalid username/email format' })
  }

  // Проверка сложности пароля
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: 'password must be at least 8 characters, include uppercase, lowercase, number and special character' 
    })
  }

  // Проверка уникальности username
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  // Генерация хэша пароля
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Создание нового пользователя
  const user = new User({
    username,
    name,
    passwordHash
  })

  // Сохранение пользователя в базе и отправка ответа
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = usersRouter


```

```js
usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  res.json(users)
})
```
// { content: 1, important: 1 }
* 1 → включить это поле

* 0 → исключить это поле

`npm install jsonwebtoken`
Создай тестовый файл, например test-env.js:
```js
require('dotenv').config(); // загружаем .env

console.log('SECRET:', process.env.SECRET);

```
`node test-env.js` 

Authorization: <scheme> <credentials>
* <scheme> — это схема аутентификации (например, Bearer, Basic, Digest и т.д.)

* <credentials> — сам токен или закодированные данные для аутентификации
