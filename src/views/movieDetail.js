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
      change: false,
      picData: null
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
    this.getPic()
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
    if (res.status === 200) {
      this.setState({
        item: res.data
      })
    } else {
      Toast.fail('网络错误', 1)
    }
  }
  async getPic () {
    const { id } = this.props.location.state.item
    const base = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '成都',
      client: 'no1',
      udid: 'no',
      start: 0,
      count: 10
    }
    let res = await request('POST', apis.moviePic + `/${id}/photos`, base)
    if (res.status === 200) {
      this.setState({
        picData: res.data.photos
      })
    } else {
      Toast.fail('网络错误', 1)
    }
  }
  changeColor () {
    if (this.props.match.path == '/movieDetail') {
      let scrollTop = document.documentElement.scrollTop
      const poster = document.getElementById('poster')
      if (!poster) return
      const topHeight = poster && poster.clientHeight
      if (scrollTop > topHeight-45) {
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
    if(this.state.item){
      return <img src={this.state.item.casts[0].avatars.small}/>
    }
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
              { this.state.picData && this.state.picData.map((res, index) => <li key={index}><img src={'https://images.weserv.nl/?url=' + res.cover}/></li>) }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
