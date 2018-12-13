import React, { Component } from 'react'
import Header from '@/components/header'
import request from '@/api'
import apis from '@/api/api'
import { Toast } from 'antd-mobile'
import '@/style/detail.scss'

export default class MovieDetail extends Component {
  constructor () {
    super()
    this.state = {
      item: null,
      change: false
    }
  }
  componentWillMount () {
    window.addEventListener('scroll', () => this.changeColor())
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', () => this.changeColor())
  }
  componentDidMount () {
    this.getData()
  }
  filter (data, flag) {
    let str = ''
    data.map((res, index) => {
      if (flag && index === data.length-1) {
        str += res
      }
      else str += `${res} / `
    })
    return str
  }
  async getData () {  
    const { id } = this.props.location.state.item
    const base = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '成都',
      client: 'no1',
      udid: 'no'
    }
    let res = await request('POST', apis.movieDetail+`/${id}`,{...base})
    console.log(res.data)
    if (res.status === 200) {
      this.setState({
        item: res.data
      })
    } else {
      Toast.fail('网络错误', 1)
    }
  }
  changeColor () {
    if (this.props.match.path == '/movieDetail') {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop > document.getElementById('poster').offsetHeight) {
        this.setState({
          change: true
        })
      } else {
        this.setState({
          change: false
        })
      }
    }
  }
  renderActor () {
    return this.state.item && this.state.item.casts.map((res, index)=>{
      console.log(res)
      return <img src={res.avatars.small}/>
    })
  }
  render() {
    const { title } = this.props.location.state.item
    const item = this.state.item
    return (
      <div style={{minHeight: '100%',backgroundColor: '#fff'}}>
        <Header title={title} transparent changeColor={this.state.change}/>
        <div id="poster">
          <img src={item && item.images.small}/>
        </div>
        <div className="des">
          <div className='first'>
            <div className="left">
              <div className="title one-row">
                {title}
              </div>
              <div className="year">
                <p className='one-row'>
                  {
                    item && item.year + ' / ' +
                  this.filter(item.countries) +
                  this.filter(item.genres, true)
                  }
                </p>
                <p className='one-row'>
                原名: {item && item.original_title}
                </p>
                <p className='one-row'>
                上映时间: {item && item.mainland_pubdate} (中国大陆)
                </p>
                <p className='one-row'>
                片长: {item && item.durations}
                </p>
              </div>
            </div>
            <div className="right">
              <div className="box">
                <p>豆瓣评分</p>
                <p className='number'>{item&&item.rating.average}</p>
                <p>{item&&item.ratings_count}人</p>
              </div>
            </div>
          </div>
          <div className="second">
            <h5>剧情简介</h5>
            <p>
              {
                item && item.summary
              }
            </p>
          </div>
          <div className="actor">
            <h5>影人</h5>
            <ul>
              <li>
                { this.renderActor() }
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
