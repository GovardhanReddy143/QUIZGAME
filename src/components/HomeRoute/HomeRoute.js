import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import './HomeRoute.css'

const HomeRoute = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleStartQuiz = async () => {
    setLoading(true)
    try {
      // Simulate a network request
      const response = await fetch('https://apis.ccbp.in/assess/questions')
      if (response.ok) {
        history.push('/quiz')
      } else {
        // Handle the error case (optional)
        console.error('Failed to start quiz')
      }
    } catch (error) {
      console.error('Error during request:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-container">
      {loading && (
        <div data-testid="loader" className="loader">
          Loading...
        </div>
      )}
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
        alt="start quiz game"
        className="start-image"
      />
      <h1>How Many Of These Questions Do You Actually Know</h1>
      <p>Test yourself with these easy quiz questions and answers</p>
      <button onClick={handleStartQuiz}>Start Quiz</button>
      <img
        src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
        alt="warning icon"
        className="warning-image"
      />
      <p>All the progress will be lost, if you reload during the quiz</p>
    </div>
  )
}

export default HomeRoute
