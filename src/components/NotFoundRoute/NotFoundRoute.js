import {useHistory} from 'react-router-dom'
import './NotFoundRoute.css'

const NotFoundRoute = () => {
  const history = useHistory()

  const handleBackToHome = () => {
    history.push('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png" // URL for the not found image
        alt="not found"
        className="not-found-image"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
      <button type="button" onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  )
}

export default NotFoundRoute
