const LoginForm = ({handleLogin, handleUsername, handlePassword, username, password }) => (
      <form onSubmit = {handleLogin}>
        <div>
          <label>
            username 
            <input 
            type='text'
            value={username}
            onChange={handleUsername }
            />
          </label>
          <br />
          <label>
            password
            <input 
            type='password'
            value={password}
            onChange={handlePassword}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
  )


  export default LoginForm
