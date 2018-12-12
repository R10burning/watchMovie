import React, { Component } from 'react'
import Header from '@/components/header'
import { Icon } from 'antd-mobile'

export default class Home extends Component {
  componentDidMount () {
    
  }
  render() {
    return (<div className="content-box">
      <Header title={'首页'} right={<Icon type='search'/>}/>
      home
    </div>)
  }
}
