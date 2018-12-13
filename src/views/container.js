import React, { Component } from 'react'
import {
  Route
} from 'react-router-dom'
import Home from 'views/home'
import Top from 'views/top250'
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
            tintColor={this.state.selectedTab === 'redTab' ? '#fe6676' :'#33A3F4'}
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="正在热映"
              key="Home"
              icon={
                <i className="fas fa-film" style={{fontSize: '21px',color: '#949494'}}/>
              }
              selectedIcon={
                <i className="fas fa-film" style={{fontSize: '21px',color: '#33A3F4'}}/>
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
                <i className="fab fa-hotjar" style={{fontSize: '21px',color: '#949494'}}/>
              }
              selectedIcon={
                <i className="fab fa-hotjar" style={{fontSize: '21px',color: '#fe6676'}}/>
              }
              title="top250"
              key="top"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                })
                history.push('/top250')
              }}
              data-seed="logId1"
            >
              <Top/>
            </TabBar.Item>
          </TabBar>
        </Route>
      </div>
    )
  }
}
