import {useState, useEffect, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import './QuizGameRoute.css'

const QuizGameRoute = () => {
  const [questions, setQuestions] = useState([])
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [timer, setTimer] = useState(15)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  const calculatePercentage = useCallback(() => {
    const correctAnswers = questions.filter(q => q.selectedOption?.isCorrect)
    return (correctAnswers.length / questions.length) * 100
  }, [questions])

  const handleSubmit = useCallback(() => {
    const percentage = calculatePercentage()
    history.push(`/results?status=${percentage >= 60 ? 'won' : 'lose'}`)
    setShowResults(true)
  }, [calculatePercentage, history])

  const handleNextQuestion = useCallback(() => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(prevIndex => prevIndex + 1)
      setSelectedOption(null)
      setTimer(15)
    } else {
      handleSubmit()
    }
  }, [activeQuestionIndex, questions.length, handleSubmit])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/assess/questions')
        if (response.ok) {
          const data = await response.json()
          setQuestions(data.questions)
        } else {
          setError('Failed to fetch questions.')
        }
      } catch (err) {
        setError('Something went wrong. Please try again.')
      }
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    let countdown
    if (questions.length > 0 && !showResults && selectedOption === null) {
      countdown = setInterval(() => {
        setTimer(prevTime => {
          if (prevTime <= 1) {
            clearInterval(countdown)
            handleNextQuestion()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(countdown)
  }, [questions, showResults, selectedOption, handleNextQuestion])

  const handleOptionClick = option => {
    setSelectedOption(option)
    setTimer(0)
  }

  if (error) {
    return (
      <div className="error-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1>Something went wrong</h1>
        <p>Our servers are busy, please try again</p>
        <button type="button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="results-container">
        <img
          src={
            calculatePercentage() >= 60
              ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png'
          }
          alt={calculatePercentage() >= 60 ? 'won' : 'lose'}
          className="results-image"
        />
        <p>Redirecting to results...</p>
      </div>
    )
  }

  const currentQuestion = questions[activeQuestionIndex] || {}

  return (
    <div className="quiz-game-container">
      <p>Question</p>
      <p>
        {activeQuestionIndex + 1}/{questions.length}
      </p>
      <p>Time Left: {timer}s</p>
      <p>{currentQuestion.question_text}</p>

      {/* Render options based on option_type */}
      {currentQuestion.options &&
        currentQuestion.options_type === 'SINGLE_SELECT' && (
          <ul>
            {currentQuestion.options.map(option => (
              <li
                key={option.id}
                className={`option-item ${
                  selectedOption?.id === option.id ? 'selected-option' : ''
                }`}
              >
                <label>
                  <input
                    type="radio"
                    name="option"
                    value={option.id}
                    checked={selectedOption?.id === option.id}
                    onChange={() => handleOptionClick(option)}
                  />
                  {option.text}
                </label>
                {selectedOption && (
                  <>
                    {option.isCorrect && selectedOption?.id !== option.id && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                        alt="correct checked circle"
                        className="status-icon"
                      />
                    )}
                    {selectedOption?.id === option.id && (
                      <img
                        src={
                          option.isCorrect
                            ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                            : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                        }
                        alt={
                          option.isCorrect
                            ? 'correct checked circle'
                            : 'Incorrect close Circle'
                        }
                        className="status-icon"
                      />
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

      {currentQuestion.options && currentQuestion.options_type === 'DEFAULT' && (
        <ul>
          {currentQuestion.options.map(option => (
            <li
              key={option.id}
              className={`option-item ${
                selectedOption?.id === option.id ? 'selected-option' : ''
              }`}
            >
              <button
                className={`option-button ${
                  option.isCorrect && selectedOption?.id === option.id
                    ? 'correct-option'
                    : ''
                }`}
                onClick={() => handleOptionClick(option)}
                type="button"
              >
                {option.text}
              </button>
              {selectedOption && (
                <>
                  {option.isCorrect && selectedOption?.id !== option.id && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      alt="correct checked circle"
                      className="status-icon"
                    />
                  )}
                  {selectedOption?.id === option.id && (
                    <img
                      src={
                        option.isCorrect
                          ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                      }
                      alt={
                        option.isCorrect
                          ? 'correct checked circle'
                          : 'Incorrect close Circle'
                      }
                      className="status-icon"
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {currentQuestion.options && currentQuestion.options_type === 'IMAGE' && (
        <ul>
          {currentQuestion.options.map(option => (
            <li
              key={option.id}
              className={`option-item ${
                selectedOption?.id === option.id ? 'selected-option' : ''
              }`}
            >
              <img
                src={option.image_url}
                alt={option.text}
                onClick={() => handleOptionClick(option)}
                className={`option-image ${
                  selectedOption?.id === option.id ? 'selected-option' : ''
                }`}
              />
              {selectedOption && (
                <>
                  {option.isCorrect && selectedOption?.id !== option.id && (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                      alt="correct checked circle"
                      className="status-icon"
                    />
                  )}
                  {selectedOption?.id === option.id && (
                    <img
                      src={
                        option.isCorrect
                          ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
                      }
                      alt={
                        option.isCorrect
                          ? 'correct checked circle'
                          : 'Incorrect close Circle'
                      }
                      className="status-icon"
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Show Next Question or Submit button */}
      {activeQuestionIndex < questions.length - 1 ? (
        <button
          type="button"
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
        >
          Next Question
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selectedOption === null}
        >
          Submit
        </button>
      )}
    </div>
  )
}

export default QuizGameRoute
