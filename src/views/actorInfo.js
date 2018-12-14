import React, { Component } from 'react'
import Header from '@/components/header'


export default class ActorInfo extends Component {

  render() {
    return (
      <div className='content-box'>
        {/* <Header title={'影人'}/> */}
        <iframe src={this.props.location.state.alt} frameBorder="0" width="100%" target="_self" height={document.documentElement.clientHeight}></iframe>  
      </div>
    )
  }
}
