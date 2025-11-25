const Blog = require('../models/blog')

const initialBlogs =[
  {title: 'New Blog',
  author: 'Shohista',
  url: 'www.shohista',
  likes: 1000000
  }, 
  {title: 'New Blog',
  author: 'Shohista',
  url: 'www.shohista',
  likes: 1777777
}
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'willremovethissoon',
    author: 'fanni',
    url: 'www.rrrrr',
    likes: 333333


})
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb
}