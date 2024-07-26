import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './LoginRoute.css'

const LoginRoute = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  const handleSubmit = async event => {
    event.preventDefault()
    setError('') // Clear previous errors
    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password}),
      })

      if (response.ok) {
        const data = await response.json()
        Cookies.set('jwt_token', data.jwt_token, {expires: 1}) // Set the cookie
        history.replace('/') // Redirect to homepage
      } else {
        const errorData = await response.json()
        setError(errorData.error_msg) // Display error message
      }
    } catch (err) {
      setError('Something went wrong. Please try again.') // Display generic error
    }
  }

  return (
    <div className="login-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/login-website-logo.png"
        alt="login website logo"
        className="logo"
      />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          USERNAME
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <label>
          PASSWORD
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <label>
          Show Password
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
        </label>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default LoginRoute
