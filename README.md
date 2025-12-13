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




###tulavaisuuden projekti

model Task {
  id Int @id @default(autoincrement())
  title String
  description String?
  status String @default("todo")
  createdAt DateTime @default(now())

  // "takaisinkytkentä"-relaatio, prisma tarvitsee
  orders      Order[]
}

model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  password String
  authLevel Int @default(0)
}

model Order {
  id       Int    @id @default(autoincrement())
  orderno  String @unique
  taskId   Int
  email    String
  paid     Boolean @default(false)
  cancelled Boolean @default(false)
  authcode String?

  task     Task @relation(fields: [taskId], references: [id])
}

Lisätään myös pari uutta tiedostoa backendiin sekä tuon utils-kansion jos ei vielä tehty:

routes/payments.js
utils/vismapay.js 

vismapay.js sisältö:

```js
const crypto = require('crypto');
 
function generateOrderValidation(validation, secretKey) {
  return crypto
    .createHmac('sha256', secretKey)
    .update(validation)
    .digest('hex')
    .toUpperCase();
}
 
function generateCheckoutAuth(apiKey, orderNumber, secretKey) {
  const msg = `${apiKey}|${orderNumber}`;
  return crypto
    .createHmac('sha256', secretKey)
    .update(msg)
    .digest('hex')
    .toUpperCase();
}
 
module.exports = { generateOrderValidation, generateCheckoutAuth };

```
//Djangon tapauksessa välitykset eteenpäin tulivat toki Djangolle itselleen, mutta tämän projektin yhteydessä meillä on erillinen frontend, joten onnistuneen maksutapahtuman päätteeksi res.redirect ohjaa käyttäjän takaisin frontendin puolelle.

```js
onst express = require('express');
const router = express.Router();
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const authorize = require('../middleware/auth');
const prisma = new PrismaClient();
const {
  generateOrderValidation,
  generateCheckoutAuth
} = require('../utils/vismapay');
 
const API_KEY = process.env.VISMAPAY_API_KEY;
const PRIVATE_KEY = process.env.VISMAPAY_PRIVATE_KEY;
const BASE_URL = 'http://localhost:3000'; 
 
router.post('/create/:taskId', authorize(0), async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
 
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    const orderno = `order-${Math.floor(Math.random() * 1000000)}`;
    const signature = generateCheckoutAuth(API_KEY, orderno, PRIVATE_KEY);
 
    // Luodaan uusi tilaus tietokantaan
    const order = await prisma.order.create({
      data: {
        orderno,
        taskId: task.id,
        email: 'customer@example.com', // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
        paid: false,
        authcode: signature
      }
    });
 
    const payload = {
      version: 'w3.2',
      api_key: API_KEY,
      order_number: orderno,
      amount: 620,      // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
      currency: 'EUR',
      email: order.email,
      payment_method: {
        type: 'e-payment',
        return_url: `${BASE_URL}/payments/success`,
        notify_url: `${BASE_URL}/payments/notify`,
        lang: 'fi',
        token_valid_until: '1442403776'
      },
      authcode: signature,
      customer: {
        firstname: 'Test', // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
        lastname: 'Customer', // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
        email: order.email, // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
        address_street: 'Street 1', // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
        address_city: 'City', // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
        address_zip: '00100' // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
      },
      products: [
        {
          id: task.id,
          title: task.title,
          count: 1, // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat frontendin puolelta "validia" tietoa
          pretax_price: 500, // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat tämän tiedon lisättyä tietokantaan ja luettua sen tässä kohtaa sieltä
          tax: 24,  // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat tämän tiedon lisättyä tietokantaan ja luettua sen tässä kohtaa sieltä
          price: 620, // TODO: KIINTEÄ ARVO: Keksi tähän ratkaisu miten saat tämän tiedon lisättyä tietokantaan ja luettua sen tässä kohtaa sieltä
          type: 1
        }
      ]
    };
 
    const response = await axios.post(
      'https://www.vismapay.com/pbwapi/auth_payment',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    const target = `https://www.vismapay.com/pbwapi/token/${response.data.token}`;
 
    res.json({ checkout_url: target });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Virhe maksutapahtumassa' });
  }
});
 
//Ei käytetä tässä yhteydessä authorize koska vismapayn rajapinta forwardoi tänne jos maksu onnistuu
router.get('/success',  async (req, res) => {
  const returnCode = parseInt(req.query.RETURN_CODE);
  const orderNumber = req.query.ORDER_NUMBER;
  const auth = req.query.AUTHCODE;
  const settled = req.query.SETTLED;
 
  let status = 'failed';
 
  //TODO: VismaPayn dokumentaatiossa: https://www.vismapay.com/docs/web_payments/?page=full-api-reference#payment-token-request
  //Tässä käsitellään vain onnistuneet maksutapahtumat ja kaikki muut koodit ovat "cancelled". Pitäisikö käsitellä useammalla tavalla?
  if (returnCode === 0) {
    const expected = generateOrderValidation(
      `${returnCode}|${orderNumber}|${settled}`,
      PRIVATE_KEY
    );
 
    if (expected === auth) {
      await prisma.order.update({
        where: { orderno: orderNumber },
        data: { paid: true }
      });
    }
    status = 'success';    
  }
  else if (returnCode != 0)
  {
    await prisma.order.update({
        where: { orderno: orderNumber },
        data: { cancelled: true }
      });
    res.json('Maksutapahtuma peruuntui tai epäonnistui');
    status = 'cancelled';
  }
  
  // TODO: kiinteä polku tällä hetkellä, lisää tämä myös frontendin koodiin niin että se lähetään maksutapahtuman yhteydessä, 
  // tallennetaan tietokantaan orders-tauluun ja luetaan se myös tässä kohtaa niin että palvelu ohjautuu edelleen oikeaan paikkaan
  return res.redirect(
    `http://localhost:5173/payment-result?status=${status}&order=${orderNumber}`
  );
});
 
module.exports = router; 
```



```js
const paymentRoutes = require('./routes/payments');
app.use('/payments', paymentRoutes);
```

Testausta varten API-key:

4753871c88c5c199350edfb8e157a5c3048ed
Testausta varten private key:

543f4e90dfd4055a68be225b190ba8b7

```js
const sortFunctions = {
  likes: (a, b) => b.likes - a.likes,
  author: (a, b) => a.author.localeCompare(b.author),
  title: (a, b) => a.title.localeCompare(b.title),
};

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const sortBlogs = (mode) => {
    setBlogs((prev) => [...prev].sort(sortFunctions[mode]));
  };

  return (
    <div>
      <div>
        <button onClick={() => sortBlogs('likes')}>Sort by Likes</button>
        <button onClick={() => sortBlogs('author')}>Sort by Author</button>
        <button onClick={() => sortBlogs('title')}>Sort by Title</button>
      </div>

      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.author}</p>
            <p>Likes: {blog.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


```
// second option

```js
const sortFunctions = {
  likes: (a, b) => b.likes - a.likes,
  author: (a, b) => a.author.localeCompare(b.author),
  title: (a, b) => a.title.localeCompare(b.title),
};

const sortModes = ['likes', 'author', 'title'];

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortModeIndex, setSortModeIndex] = useState(0);

  const sortBlogs = (mode) => {
    setBlogs((prev) => [...prev].sort(sortFunctions[mode]));
  };

  const handleToggleSort = () => {
    const nextIndex = (sortModeIndex + 1) % sortModes.length; // циклично
    setSortModeIndex(nextIndex);
    sortBlogs(sortModes[nextIndex]);
  };

  return (
    <div>
      <button onClick={handleToggleSort}>
        Sort by {sortModes[sortModeIndex]} (click to change)
      </button>

      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.author}</p>
            <p>Likes: {blog.likes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


```

npm run lint -- --fix
 
