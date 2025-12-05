const LoginForm = (props) => (
    <div>
        <h2>Login</h2>
        <form onSubmit = {props.handleLogin}>
            <label>
                username 
                <input 
                type="text" 
                value ={props.username}
                onChange = {props.handleUsername}
                />
            </label>
            <label>
                password 
                <input 
                type="password" 
                value ={props.password}
                onChange = {props.handlePassword}
                />
            </label>
            <button type="submit" >login</button>
        </form>
    </div>
)

export default LoginForm