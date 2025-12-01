const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware= require('../utils/middleware')

blogsRouter.use(middleware.tokenExtractor)



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
  const blogToDelete= await Blog.findByIdAndDelete(req.params.id)
  if (blogToDelete) {
    res.status(204).end()
  }else {
    res.status(404).json({ error: 'blog not found' })
  }
})


blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(400).json({ error: 'userId missing or not valid' })
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
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
