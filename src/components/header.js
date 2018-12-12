import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    right: PropTypes.element.isRequired
  }
  static defaultProps = {
    title: '',
    right: <i/>
  }
  constructor (props) {
    super(props)
    this.state = {
      canGoBack: false
    }
  }
  componentDidMount () {
    const { match } = this.props
    this.setState({
      canGoBack: (match.path === '/' || match.path === '/home' || match.path === '/me') ? false : true
    })
  }
  render() {
    const { match } = this.props
    return (
      <div>
        <NavBar
          id="ant-header"
          mode="dark"
          icon={this.state.canGoBack && <Icon type="left" />}
          rightContent={
            (match.path === '/' || match.path === '/home') && this.props.right
          }
        >{ (match.path === '/' || match.path === '/home') ? '首页' :  match.path === '/me' ? '我的' : this.props.title }</NavBar>
      </div>
    )
  }
}

export default withRouter(Header)
