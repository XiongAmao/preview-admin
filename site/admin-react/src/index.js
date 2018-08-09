import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import style from './index.scss'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Main from './components/Main/Main'
import UiWrapper from './components/Ui/UiWrapper'

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Main}/>
      <Route path="/ui" component={UiWrapper}></Route>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.getElementById('root'))
