import React, { Component } from 'react'
import Header from '@/components/header'
import { Icon, ListView } from 'antd-mobile'
import request from '@/api'
import query from 'querystring'
import '@/style/home.scss'
export default class Home extends Component {
  constructor () {
    super()
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource
    }
  }
  async componentDidMount () {
    const base = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '成都',
      start: 0,
      count: 10,
      client: 'no',
      udid: 'no'
    }
    const res = await request('GET', '/v2/movie/in_theaters?' + query.stringify(base))
    console.log(res.data.subjects)
    if(res.status === 200) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.data.subjects),
        height: document.documentElement.clientHeight
      })
    }
  }
  renderRow (item) {
    return <div className='list-item'>
      <div className='left'>
        <img src={item.images.small} alt=""/>
      </div>
      <div className='right'>
        <header className="title one-row">
          {item.title}
        </header>
        <div className="rate">
          {item.rating.average === 0 ? '暂无评分' : `评分：${item.rating.average}`}
        </div>
        <div className="director">
          导演：{item.directors[0].name}
        </div>
        <div className="casts one-row">
          主演：{item.casts.map(
            (list, index) => {
              return index === item.casts.length-1 ?  list.name : list.name + '/'
            })}
        </div>
      </div>
    </div>
  }
  render() {
    return (<div className="content-box">
      <Header title={'首页'} right={<Icon type='search'/>}/>
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={(item)=>this.renderRow(item)}
        // renderSeparator={}
        className="am-list list-movie"
        pageSize={4}
        style={{
          height: this.state.height,
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
        onScroll={() => { console.log('scroll') }}
        // scrollRenderAheadDistance={500}
        onEndReached={() => alert(123)}
        onEndReachedThreshold={10}
      />
    </div>)
  }
}
