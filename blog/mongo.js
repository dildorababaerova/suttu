const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const url=`mongodb+srv://mongoDidi:${password}@cluster0.6tgm7kr.mongodb.net/blog?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)


// If only password provided, list all blogs
if (process.argv.length === 3) {
  Blog.find({}).then(blogs => {
    console.log('blogs:')
    blogs.forEach(blog => {
      console.log(`${blog.title} by ${blog.author}, URL: ${blog.url}, Likes: ${blog.likes}`)
    })
    mongoose.connection.close()
  })
}
// If all arguments provided, add new blog
else if (process.argv.length === 7) {
  const blog = new Blog({
    title: process.argv[3],
    author: process.argv[4],
    url: process.argv[5],
    likes: Number(process.argv[6]),
  })

  blog.save().then(result => {
    console.log(`Added "${blog.title}" by ${blog.author} to blogs`)
    mongoose.connection.close()
  })
} else {
  console.log('Invalid number of arguments')
  console.log('Usage: node mongo.js <password> [title author url likes]')
  mongoose.connection.close()
}
