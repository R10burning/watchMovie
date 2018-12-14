import React, { Component } from 'react'
import Header from '@/components/header'
import request from '@/api'
import apis from '@/api/api'
import { Toast } from 'antd-mobile'
import '@/style/detail.scss'
import { ActivityIndicator } from 'antd-mobile'
import WxImageViewer from 'react-wx-images-viewer'
import { Link } from 'react-router-dom'

export default class MovieDetail extends Component {
  constructor () {
    super()
    this.state = {
      item: null,
      change: false,
      picData: null,
      actorData: null,
      showIndex: 0,
      showViewer: false,
      galleryData: null
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
      const actorData = res.data.directors.concat(res.data.casts)
      this.setState({
        item: res.data,
        actorData
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
      let arr = []
      await res.data.photos.map(item => {
        arr.push(item.image)
      })
      await this.setState({
        picData: res.data.photos,
        galleryData: arr
      })
    } else {
      Toast.fail('网络错误', 1)
    }
  }
  changeColor () {
    if (this.props.match.path == '/movieDetail') {
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      const poster = document.getElementById('poster')
      if (!poster) return
      const topHeight = poster && poster.clientHeight
      if (scrollTop >= topHeight-45) {
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
    if(this.state.actorData){
      return this.state.actorData.map((res, index) => {
        return <li key={index}>
          <Link to={{
            pathname: '/actorInfo',
            state: {
              alt: res.alt
            }
          }}>
            <img src={res.avatars.small}/>
            <p style={{marginTop: '10px'}} className='one-row'>
              { res.name }
            </p>
            <p style={{marginTop: '10px'}}>
              {index === 0 ? '导演' : '演员'}
            </p>
          </Link>
        </li>
      })
    }
  }
  closeViewer () {
    this.setState({showViewer: false})
  }
  renderViewer (index) {
    this.setState({
      showIndex: index,
      showViewer: true
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
              { this.renderActor() }
            </ul>
          </div>
          <div className="film-photo actor">
            <h5>预告片 / 剧照</h5>
            <ul>
              <li style={{position: 'relative'}} onClick={()=>this.props.history.push({
                pathname: '/videoPlay',
                state: {
                  uri: item.trailers
                }
              })}>
                <img src={item && item.trailers[0].medium}/>
                <i className="fas fa-play-circle" id='play'></i>
              </li>
              { this.state.picData && this.state.picData.map((res, index) => <li onClick={()=> this.renderViewer(index)} key={index}><img src={res.cover}/></li>) }
            </ul>
          </div>
        </div>
        { this.state.showViewer && <WxImageViewer 
          onClose={()=>this.closeViewer()}
          urls={this.state.galleryData}
          index={this.state.showIndex}/>
        }
      </div>
    )
  }
}
