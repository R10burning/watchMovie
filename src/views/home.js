import React, { Component } from 'react'
import Header from '@/components/header'
import { Icon } from 'antd-mobile'
import apis from '@/api/api'
import CommonList from '@/components/commonList'

export default class Home extends Component {
  render () {
    return (<div className="content-box">
      <Header title={'首页'} right={<Icon type='search'/>}/>
      <CommonList requestUrl={apis.hotPlay}/>
    </div>)
  }
}
