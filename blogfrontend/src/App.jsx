import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const[user, setUser] =useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON= window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) //because it parsed to string for window localeStorage(DOM)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(prevBlogs => prevBlogs.concat(returnedBlog))
        setSuccessMessage(`${blogObject.title} added` )
        setTimeout(()=>{
          setSuccessMessage(null)
        }, 5000)
        
      })
      .catch(error => {
        // Обработка ошибки, например, показать сообщение об ошибке
        setErrorMessage('Error adding blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel = "add new blog" >
      <AddBlog createBlog={addBlog} />
    </Togglable>
  )

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() =>{
        setErrorMessage(null)
      }, 5000)
    }

  }

  const loginForm =() =>(
  <Togglable buttonLabel = 'login'>
    <LoginForm 
    handleLogForm={handleLogin}
    />
  </Togglable>
  )


  const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  setUser(null)
}

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {user === null?
      <div>
        {loginForm()}
      </div>
      : (
        <div>
          <h1>Blogs</h1>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            {blogForm()}
        </div> 
      )}
       <ul>
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </ul>
    </div>
  )}

export default App