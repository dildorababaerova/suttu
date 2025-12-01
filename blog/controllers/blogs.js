const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

blogsRouter.use(tokenExtractor)


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

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  console.log( 'USER ID', user)

  const userid = user.id

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if ( blog.user.toString() === userid ) {
    await Blog.findByIdAndDelete(req.params.id)
    return res.status(204).end()
  }
  return res.status(403).json({ error: 'only the creator can delete the blog' })

})


blogsRouter.post('/',  userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user
  if (!user) {
    return res.status(400).json({ error: 'user missing or not valid' })
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
