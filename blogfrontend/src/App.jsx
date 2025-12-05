import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogLikes, setBlogLikes] = useState('') // теперь как строка
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const[user, setUser] =useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() =>{
        setErrorMessage(null)
      }, 5000)
    }

  }


  // Обработчики изменений для каждого поля
  const handleTitleChange = (event) => setBlogTitle(event.target.value)
  const handleAuthorChange = (event) => setBlogAuthor(event.target.value)
  const handleUrlChange = (event) => setBlogUrl(event.target.value)
  const handleLikesChange = (event) => setBlogLikes(event.target.value)
  const handleUsername = ({target}) => setUsername(target.value)
  const handlePassword = ({target}) => setPassword(target.value)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user? (
        <div>
          <ul>
            <p>{user.name} logged in    </p>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </ul>
        <AddBlog 
        addBlog={addBlog}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        handleLikesChange={handleLikesChange}
        /> 
        </div>)
        :
        <LoginForm 
        handleLogin={handleLogin}
        handleUsername={handleUsername}
        handlePassword={handlePassword}
        />
      }
      
     
    </div>
  )
}

export default App