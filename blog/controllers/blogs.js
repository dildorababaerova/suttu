const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
  res.json(blog);
} else {
  res.status(404).end();
}
})

blogsRouter.delete('/:id', async (req, res) => {
  const blogToDelete= await Blog.findByIdAndDelete(req.params.id)
  if (blogToDelete) {
    res.status(204).end()
  }else {
    res.status(404).json({error: 'blog not found'})
  }
})


blogsRouter.post('/', async (req, res) => {
  const body = req.body

if (!body.title|| !body.author || !body.url) {
    return res.status(400).json({ error: 'blog title or author missing' })
  }

  const newBlog = new Blog({
    title:body.title,
    author:body.author,
    url: body.url,
    likes:body.likes || 0
  })

  const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
})

module.exports = blogsRouter
