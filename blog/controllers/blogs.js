const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', { username:1, name:1 })
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const user = req.user
    if (!user) {
      return res.status(401).json({ error: 'token missing or user not found' })
    }

    // Вариант 1: Без populate (если user хранится как ObjectId)
    const blog = await Blog.findById(req.params.id)

    // Вариант 2: С populate (если нужно получить данные пользователя)
    // const blog = await Blog.findById(req.params.id).populate('user')

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    // КРИТИЧЕСКИ ВАЖНО: Проверяем, что blog.user существует
    if (!blog.user) {
      return res.status(400).json({ error: 'blog has no owner information' })
    }

    // console.log('User from middleware:', user)
    // console.log('Blog found:', blog)
    // console.log('Blog ID:', blog.id)
    // console.log('Blog user ID type:', typeof blog.id)
    // console.log('Blog user ID:', blog.user)
    // console.log('Blog user ID type:', typeof blog.user)
    // console.log('Blog user ID toString:', blog.user.toString())
    // console.log('Current user ID:', user._id)
    // console.log('Current user ID toString:', user._id.toString())

    // СПОСОБ 1: Для ObjectId (рекомендуется)
    // Приводим оба значения к строке и сравниваем
    // const blogUserId = blog.user.toString ? blog.user.toString() : blog.user
    // const currentUserId = user._id.toString ? user._id.toString() : user._id

    if (blog.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'only the creator can delete the blog' })
    }

    // СПОСОБ 2: Используя equals() метод Mongoose (лучшая практика)
    // if (!blog.user.equals(user._id)) {
    //   return res.status(403).json({ error: 'only the creator can delete the blog' })
    // }

    // Удаляем блог
    await Blog.findByIdAndDelete(req.params.id)

    // Обновляем массив blogs у пользователя
    // Используем pull для удаления из массива (более эффективно)
    user.blogs.pull(blog._id)
    await user.save()

    res.status(204).end()
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: 'server error during deletion' })
  }
})


blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: 'user missing or not valid' })
  }

  if (!body.title|| !body.author || !body.url) {
    return res.status(400).json({ error: 'blog title or author missing' })
  }


  const newBlog = new Blog({
    title:body.title,
    author:body.author,
    url: body.url,
    likes:body.likes || 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs.push(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id/likes', async(req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $inc:{ likes:1 } },
    { new: true }
  )

  if (!updatedBlog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  res.status(200).json(updatedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const user = req.user
  if(!user) {
    return res.status(401).json({ error: 'token missing or invalid for update' })
  }
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog for update not found' })
  }

  if (blog.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: 'only creator can update the blog' })
  }

  const body= req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title:body.title,
      author:body.author,
      url: body.url,
      // likes:body.likes
    },
    {
      new:true,
      runValidators:true,
      context: 'query'
    }
  )
  if (!updatedBlog) {
    return res.status(404).json({ error: 'updated blog not found' })
  }

  res.status(200).json(updatedBlog)

})

module.exports = blogsRouter
