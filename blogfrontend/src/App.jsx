import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState('') // теперь как строка
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
      likes: Number(blogLikes), // преобразуем строку в число
    }

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`${blogObject.title} added` )
        setTimeout(()=>{
          setErrorMessage(null)
        }, 5000)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setBlogLikes('')
      })
      .catch(error => {
        // Обработка ошибки, например, показать сообщение об ошибке
        setErrorMessage('Error adding blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // Обработчики изменений для каждого поля
  const handleTitleChange = (event) => setBlogTitle(event.target.value)
  const handleAuthorChange = (event) => setBlogAuthor(event.target.value)
  const handleUrlChange = (event) => setBlogUrl(event.target.value)
  const handleLikesChange = (event) => setBlogLikes(event.target.value)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      
      <ul>
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </ul>
      <form onSubmit={addBlog}>
        <div>
          <label>Title:</label>
          <input value={blogTitle} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Author:</label>
          <input value={blogAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          <label>URL:</label>
          <input value={blogUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <label>Likes:</label>
          <input value={blogLikes} onChange={handleLikesChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App