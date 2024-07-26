import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header/Header'
import LoginRoute from './components/LoginRoute/LoginRoute'
import HomeRoute from './components/HomeRoute/HomeRoute'
import QuizGameRoute from './components/QuizGameRoute/QuizGameRoute'
import GameResultsRoute from './components/GameResultsRoute/GameResultsRoute'
import GameReportsRoute from './components/GameReportsRoute/GameReportsRoute'
import NotFoundRoute from './components/NotFoundRoute/NotFoundRoute'
import './App.css'

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route path="/login" component={LoginRoute} />
      <Route path="/quiz" component={QuizGameRoute} />
      <Route path="/results" component={GameResultsRoute} />
      <Route path="/reports" component={GameReportsRoute} />
      <Route component={NotFoundRoute} />
    </Switch>
  </Router>
)

export default App
