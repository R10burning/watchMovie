import React, { Component } from 'react'
import Header from '@/components/header'
import CommonList from '@/components/commonList'
import apis from '@/api/api'

export default class Top extends Component {
  render() {
    return (
      <div className="content-box">
        <Header title='Top250'/>
        <CommonList requestUrl={apis.top250} showTicket={false}/>
      </div>
    )
  }
}
