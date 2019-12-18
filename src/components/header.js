import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    right: PropTypes.element.isRequired,
    transparent: PropTypes.bool.isRequired,
    changeColor: PropTypes.bool.isRequired
  }
  static defaultProps = {
    title: '',
    right: <i/>,
    transparent: false,
    changeColor: false
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
      canGoBack: (match.path === '/' || match.path === '/home' || match.path === '/top250') ? false : true
    })
  }
  back () {
    this.props.history.goBack()
  }
  ellipse (title) {
    return title.length > 12 ? title.substr(0, 12) + '...' : title
  }
  render() {
    const { match } = this.props
    return (
      <div>
        <NavBar
          style={{
            backgroundColor: this.props.transparent && !this.props.changeColor ? 'rgba(0,0,0,.1)' : this.props.transparent && this.props.changeColor ? '#108ee9' : '#108ee9'
          }}
          id="ant-header"
          mode="dark"
          icon={this.state.canGoBack && <Icon type="left" onClick={()=>this.back()}/>}
          rightContent={
            (match.path === '/' || match.path === '/home') && this.props.right
          }
        >{ this.ellipse((match.path === '/' || match.path === '/home') ? '首页' :  match.path === '/top250' ? 'Top250' : this.props.title) }</NavBar>
      </div>
    )
  }
}

export default withRouter(Header)
