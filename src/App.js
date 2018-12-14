import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Container from '@/views/container'
import MovieDetail from '@/views/movieDetail'
import VideoPlay from '@/views/videoPlay'
import ActorInfo from '@/views/actorInfo'

class App extends Component {
  render() {
    return (
      <div className="box">
        <Router>
          <Switch>
            <Route path='/' component={Container} exact/>
            <Route path='/404' render={()=><div>404</div>}></Route>
            <Route path='/home' component={Container}></Route>
            <Route path='/movieDetail' component={MovieDetail}></Route>
            <Route path='/top250' component={Container}></Route>
            <Route path='/videoPlay' component={VideoPlay}></Route>
            <Route path='/actorInfo' component={ActorInfo}></Route>
            <Redirect to='/404'/>
          </Switch>
        </Router>
      </div>
    )}
}

export default App
