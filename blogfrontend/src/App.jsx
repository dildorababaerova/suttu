import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import LogOut from './components/Logout'
import Footer from './components/Footer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const[user, setUser] =useState(null)

  const sortBlogs = blogs => [...blogs].sort((a, b) => b.likes - a.likes)


  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(sortBlogs(initialBlogs))
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

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(prev => sortBlogs([...prev, (returnedBlog)]))
      setSuccessMessage(`${blogObject.title} added` )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      blogFormRef.current.toggleVisibility()

    } catch (error) {
      // Обработка ошибки, например, показать сообщение об ошибке
      setErrorMessage('Error adding blog'+ (error.response?.data?.error || error.message))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikes = async (id) => {
    try {
      const updatedBlog = await blogService.updateLikes(id)
      console.log(updatedBlog)
      setBlogs(prev => {
        const newBlogs = prev.map(blog => blog.id === id ? updatedBlog: blog)
        return sortBlogs(newBlogs)
      })

      setSuccessMessage(`${updatedBlog.title} updated` )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      // Обработка ошибки, например, показать сообщение об ошибке
      setErrorMessage('Error updating blog'+ (error.response?.data?.error || error.message))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel = "add new blog" ref={blogFormRef}>
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

    } catch (error) {
      setErrorMessage(error.response?.data?.error || error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const loginForm =() => (
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

  const handleDelete = async(id) => {
    try {
      if (window.confirm('Do you want to delete this blog ?')) {
        await blogService.deleteBlog(id)
        setBlogs(prev => {
          const withoutDeleteBlog = prev.filter(blog => blog.id !==id)
          return sortBlogs(withoutDeleteBlog)
        })}
      setSuccessMessage('Deleted succesfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      // Обработка ошибки, например, показать сообщение об ошибке
      setErrorMessage('Error deleting blog'+ (error.response?.data?.error || error.message))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <h1>Blogs</h1>
      {user === null?
        <div>
          {loginForm()}
        </div>
        : (
          <div>
            <p>{user.name} logged in</p>
            <LogOut handleLogout= {handleLogout} />
            {blogForm()}
          </div>
        )}
      <div className="blog-grid">
        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes= {handleLikes}
            handleDelete = {handleDelete}
          />
        ))}
      </div>
      <Footer />
    </div>
  )}

export default App