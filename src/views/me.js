import React, { Component } from 'react'
import Header from '@/components/header'

export default class Me extends Component {
  render() {
    return (
      <div className="content-box">
        <Header title='我的'/>
        我的信息
      </div>
    )
  }
}
