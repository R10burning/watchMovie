import React, { Component } from 'react'
import {
  Route
} from 'react-router-dom'
import Home from 'views/home'
import Me from 'views/me'
import { TabBar } from 'antd-mobile' 


export default class Container extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: false,
    }
  }
  componentDidMount () {
    const { match, history, location } = this.props
    if (location.pathname === '/home' || location.pathname === '/') {
      this.setState({selectedTab: 'blueTab'})
    } else {
      this.setState({selectedTab: 'redTab'})
    }
  }
  render() {
    const { match, history } = this.props
    return (
      <div className='box'>
        <Route>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="Home"
              icon={
                <i className="fas fa-home" style={{fontSize: '21px',color: '#949494'}}/>
              }
              selectedIcon={
                <i className="fas fa-home" style={{fontSize: '21px',color: '#33A3F4'}}/>
              }
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                })
                history.push('/home')
              }}
              data-seed="logId"
            >
              <Home/>
            </TabBar.Item>
            <TabBar.Item
              icon={
                <i className="fas fa-plus-circle" style={{fontSize: '21px',color: 'orange'}}/>
              }
              selectedIcon={
                <i className="fas fa-plus-circle" style={{fontSize: '21px',color: 'orange'}}/>
              }
              title="发布"
              key="pub"
              onPress={() => {
                history.push('/login')
              }}
            />
            <TabBar.Item
              icon={
                <i className="fas fa-user" style={{fontSize: '21px',color: '#949494'}}/>
              }
              selectedIcon={
                <i className="fas fa-user" style={{fontSize: '21px',color: '#33A3F4'}}/>
              }
              title="我的"
              key="my"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                })
                history.push('/me')
              }}
              data-seed="logId1"
            >
              <Me/>
            </TabBar.Item>
          </TabBar>
        </Route>
      </div>
    )
  }
}
