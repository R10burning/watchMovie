import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Container from '@/views/container'
import '@/style/home.scss'

class App extends Component {
  render() {
    return (
      <div className="box">
        <Router>
          <Switch>
            <Route path='/' component={Container} exact/>
            <Route path='/404' render={()=><div>404</div>}></Route>
            <Route path='/home' component={Container}></Route>
            <Route path='/me' component={Container}></Route>
            <Redirect to='/404'/>
          </Switch>
        </Router>
      </div>
    )}
}

export default App
