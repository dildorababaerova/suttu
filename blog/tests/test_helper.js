const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs =[
  { title: 'New Blog',
    author: 'Shohista',
    url: 'www.shohista',
    likes: 1000000
  },
  { title: 'Fitnes blog',
    author: 'Fifi',
    url: 'www.finland.fi',
    likes: 1777777
  }
]

const nonExistingId = async () => {
  try {
    const blog = new Blog({
      title: 'willremovethissoon',
      author: 'fanni',
      url: 'www.rrrrr',
      likes: 333333
    })

    await blog.save()

    const blogId = blog._id.toString()
    // console.log('INVALID_ID', blogId)

    await blog.deleteOne()

    return blogId
  } catch (error) {
    console.log('ERROR:', error)
  }
}
nonExistingId().then(id => console.log('INVALID_ID', id))

const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb, usersInDb
}