const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert(titles.includes('Fitnes blog'))
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      console.log('Invalid_id', validNonexistingId)

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '6925fea917182bf58b219c0'

      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with a valid user', async () => {
      const newBlog = {
        title: 'test',
        author: 'mongoose',
        url: 'www.mongoose.fi',
        likes: 20000
      }

      // 1. Логинимся
      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })

      const token = loginResponse.body.token

      // 3. Добавляем блог
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('succeeds with valid data and links to user', async () => {
      const newBlog = {
        title: 'test',
        author: 'mongoose',
        url: 'www.mongoose.fi',
        likes: 20000
      }

      // 1. Логинимся
      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })

      const token = loginResponse.body.token

      // 2. Находим пользователя по имени (не полагаемся на login response)
      const userBefore = await User.findOne({ username: 'root' })
      assert.ok(userBefore, 'User should exist') // Проверяем, что пользователь не null

      const userBlogsCountBefore = userBefore.blogs.length

      // 3. Добавляем блог
      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const savedBlog = response.body

      // 4. Обновляем данные пользователя
      const userAfter = await User.findOne({ username: 'root' })
      const userBlogsCountAfter = userAfter.blogs.length

      // 5. Проверяем, что массив blogs увеличился
      assert.strictEqual(
        userBlogsCountAfter,
        userBlogsCountBefore + 1,
        'User blogs array should increase by 1'
      )

      // 6. Проверяем, что ID блога есть в массиве пользователя
      const blogIds = userAfter.blogs.map(id => id.toString())
      assert.ok(
        blogIds.includes(savedBlog.id),
        `Blog ID ${savedBlog.id} should be in user's blogs array`
      )
    })

    test('fail without token', async () => {
      const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'mongoose',
        url:'www.mongoose.fi',
        likes: 20000
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('update blog with valid id and token', async () => {
      // Сначала создаем блог с токеном
      const newBlog = {
        title: 'Blog to update',
        author: 'Author',
        url: 'http://update.com',
        likes: 0
      }

      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
      const token = loginResponse.body.token

      const createdBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

      // Обновляем блог
      const updatedData = {
        title: 'Updated title',
        author: 'Updated author',
        url: 'http://updated.com',
        likes: 100
      }

      await api
        .put(`/api/blogs/${createdBlog.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData)
        .expect(200)

      // Проверяем, что блог обновился
      const updatedBlog = await Blog.findById(createdBlog.body.id)
      assert.strictEqual(updatedBlog.title, 'Updated title')
    })
    test('update blog with valid id and token updated only title', async () => {
      // Сначала создаем блог с токеном
      const newBlog = {
        title: 'Blog to update',
        author: 'Author',
        url: 'http://update.com',
        likes: 0
      }

      const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })
      const token = loginResponse.body.token

      const createdBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

      // Обновляем блог
      const updatedData = {
        title: 'Updated title',
        author: 'Author',
        url: 'http://update.com',
        likes: 0
      }

      await api
        .put(`/api/blogs/${createdBlog.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData)
        .expect(200)

      // Проверяем, что блог обновился
      const updatedBlog = await Blog.findById(createdBlog.body.id)
      assert.strictEqual(updatedBlog.title, 'Updated title')
    })
    //   test('fails with status code 400 if data invalid', async () => {
    //     const newBlog = { author: 'jojo' }

    //     await api.post('/api/blogs').send(newBlog).expect(400)

    //     const blogsAtEnd = await helper.blogInDb()

  //     assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  //   })
  })

  //   describe('deletion of a blog', () => {
  //     test('succeeds with status code 204 if id is valid', async () => {
  //       const blogsAtStart = await helper.blogInDb()
  //       const blogToDelete = blogsAtStart[0]

  //       await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  //       const blogsAtEnd = await helper.blogInDb()

  //       const titles = blogsAtEnd.map(n => n.title)
  //       assert(!titles.includes(blogToDelete.title))

//       assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
//     })
//   })
})

after(async () => {
  await mongoose.connection.close()
})