import React from 'react'
import './GameReportsRoute.css'

const GameReportsRoute = ({reportData}) => {
  const {
    CorrectAnswers,
    IncorrectAnswers,
    UnattemptedAnswers,
    unattemptedQuestions,
  } = reportData

  return (
    <div className="game-reports-container">
      <h1>Game Reports</h1>

      {/* Display counts for correct, incorrect, and unattempted answers */}
      <p>{CorrectAnswers} Correct answers</p>
      <p>{IncorrectAnswers} Incorrect answers</p>
      <p>{UnattemptedAnswers} Unattempted answers</p>

      {/* Conditionally render unattempted questions or message if all questions are attempted */}
      {UnattemptedAnswers > 0 ? (
        <div>
          <h2>Unattempted Questions</h2>
          <ul>
            {unattemptedQuestions.map(question => (
              <li key={question.id}>
                <p>{question.question_text}</p>
                <ul>
                  {question.options.map(option => (
                    <li key={option.id}>
                      {/* Handle option types */}
                      {question.option_type === 'DEFAULT' && (
                        <div>
                          <p>{option.text}</p>
                          {option.is_correct && (
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                              alt="correct checked circle"
                            />
                          )}
                        </div>
                      )}
                      {question.option_type === 'IMAGE' && (
                        <div>
                          <img src={option.image_url} alt={option.text} />
                          {option.is_correct && (
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                              alt="correct checked circle"
                            />
                          )}
                        </div>
                      )}
                      {question.option_type === 'SINGLE_SELECT' && (
                        <div>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.id}
                            readOnly
                          />
                          {option.text}
                          {option.is_correct && (
                            <img
                              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
                              alt="correct checked circle"
                            />
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2>Attempted all the questions</h2>
      )}
    </div>
  )
}

export default GameReportsRoute
