import { useState } from 'react'

const LoginForm = ({ handleLogForm }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = ( event) => {
    event.preventDefault()
    handleLogForm({
      username:username,
      password:password
    })

    setUsername('')
    setPassword('')
  }

  const handleUsername = ({ target }) => setUsername(target.value)
  const handlePassword = ({ target }) => setPassword(target.value)
  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit = {handleLogin} className="login-form">
        <div className="form-group" >
          <label>
                username
            <input
              type="text"
              value ={username}
              onChange = {handleUsername}
            />
          </label>
        </div>

        <div className="form-group" >
          <label>
                password
            <input
              type="password"
              value ={password}
              onChange = {handlePassword}
            />
          </label>
        </div>
        <button type="submit" className="login-btn">login</button>
      </form>
    </div>
  )
}



export default LoginForm