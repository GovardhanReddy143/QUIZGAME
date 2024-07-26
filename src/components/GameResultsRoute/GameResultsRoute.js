import {useHistory} from 'react-router-dom'
import './GameResultsRoute.css'

const GameResultsRoute = ({score, total}) => {
  const history = useHistory()

  const percentage = Math.round((score / total) * 100)
  const isPassed = percentage >= 60

  const handleReport = () => {
    history.push('/game-reports')
  }

  return (
    <div className="game-results-container">
      {isPassed ? (
        <div>
          <h1>Congrats</h1>
          <h2>{percentage}% Correctly Answered</h2>
          <p>Quiz completed successfully</p>
          <button type="button" onClick={handleReport}>
            Report
          </button>
        </div>
      ) : (
        <div>
          <h1>You lose</h1>
          <h2>{percentage}% Correctly Answered</h2>
          <button type="button" onClick={handleReport}>
            Report
          </button>
        </div>
      )}
      <p>
        You attempted {score} out of {total} questions correctly
      </p>
    </div>
  )
}

export default GameResultsRoute
