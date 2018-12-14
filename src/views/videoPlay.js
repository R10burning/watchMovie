import React, { Component } from 'react'
import Header from '@/components/header'
import '@/style/videoPlay.scss'

export default class VideoPlay extends Component {
  constructor (props) {
    super(props)
    const activeUri = props.location.state.uri

    this.state = {
      activeIndex: 0,
      activeUri: activeUri[0].resource_url
    }
  }
  beActive (activeIndex) {
    const activeUri = this.props.location.state.uri
    this.setState({
      activeIndex,
      activeUri: activeUri[activeIndex].resource_url
    })
  }
  renderList() {
    const urls = this.props.location.state.uri
    return  urls.map((item, index) => {
      return <li onClick={()=>this.beActive(index)} key={index}>
        <div className="left">
          <img src={item.small}
            style={{
              border: this.state.activeIndex === index ? '1px solid orange' : '1px solid transparent'
            }}
          />
        </div>
        <div className="right">
          <h5
            style={{
              color: this.state.activeIndex === index ? 'orange' : 'inherit'
            }}
          >{item.title}</h5>
        </div>
      </li>
    })
  }
  render() {
    const urls = this.props.location.state.uri
    return (
      <div style={{paddingTop: '300px', minHeight: '100%', backgroundColor: '#fff'}}>
        <Header title= {urls[this.state.activeIndex].title} transparent/>
        <video src={this.state.activeUri} controls="controls" 
          width="100%" height="300" autoPlay 
          style={{
            backgroundColor: '#000',
            position: 'fixed',
            top: 0,
            left:0
          }}
        >
          浏览器不支持video
        </video>
        <ul className='video-list'>
          <li style={{fontSize: '12px', color: '#999'}}>
            观看预告片({ urls.length })
          </li>
          {this.renderList()}
        </ul>
      </div>
    )
  }
}
