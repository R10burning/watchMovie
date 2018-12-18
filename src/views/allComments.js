import React, { Component } from 'react'
import Header from '@/components/header'
import {
  ListView,
  ActivityIndicator,
  PullToRefresh,
  Toast
} from 'antd-mobile'
import request from '@/api'
import apis from '@/api/api'
import '@/style/comments.scss'
import Rating from 'react-rating'


export default class AllComments extends Component {
  constructor() {
    super()
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
      isLoading: false,
      start: 0,
      page: 1,
      maxPage: 1,
      listData: null,
      refreshing: false,
      total: 0
    }
  }
  componentDidMount() {
    this.getData()
  }
  async getData() {
    await this.setState({
      start: 0,
      count: 10,
      page: 1,
      maxPage: null
    })
    const base = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '成都',
      start: 0,
      count: 10,
      client: 'no1',
      udid: 'no'
    }
    const res = await request('POST', apis.movieComments + `/${this.props.location.state.id}/comments`, base)
    if (res && res.status === 200) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.data.comments),
        height: document.documentElement.clientHeight,
        maxPage: Math.ceil((res.data.total) / 10),
        listData: res.data.comments,
        refreshing: false,
        total: res.data.total
      })
    } else {
      Toast.fail('网络错误', 1)
    }
  }
  onRefresh() {
    this.setState({
      refreshing: true
    })
    this.getData()
  }
  async loadMore() {
    this.state.start += 10
    this.state.page++
    if (this.state.page > this.state.maxPage || this.state.maxPage === 1) return
    await this.setState({
      isLoading: true
    })
    let base = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '成都',
      start: this.state.start,
      count: 10,
      client: 'no1',
      udid: 'no'
    }
    let res = await request('POST', apis.movieComments + `/${this.props.location.state.id}/comments`, { ...base
    })
    if (res.status === 200) {
      this.setState({
        isLoading: false,
        listData: this.state.listData.concat(res.data.comments)
      }, () => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.listData)
        })
      })
    }
  }
  renderRow (item) {
    return <div className='list-item'>
      <img src={item.author.avatar}/>
      <div className="right">
        <div className="user">
          <span>{item.author.name}</span>
          <Rating
            initialRating={item.rating.value}
            readonly
            emptySymbol={<i className='fas fa-star' style={{
              color: '#eee',
              fontSize: '12px'

            }}/>}
            fullSymbol={<i className='fas fa-star' style={{
              color: '#f99f32',
              fontSize: '12px'
            }}/>}
          />
          <div className='useful'>
            <i className="far fa-thumbs-up"/> {item.useful_count}
          </div>
        </div>
        <p className='content'>
          {item.content}
        </p>
      </div>
    </div>
  }
  render() {
    return (
      <div className="content-box">
        <Header title='全部短评'/>
        {
          this.state.listData ?
            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={() => (<div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center' }}>
                {this.state.isLoading && <ActivityIndicator
                  text='拼命加载中...'
                />}
                {(!this.state.isLoading && this.state.page >= this.state.maxPage) && '--我是有底线的--'}
              </div>)}
              renderRow={(item)=>this.renderRow(item)}
              renderHeader={()=><div>
                短评{this.state.total}条
              </div>}
              className="am-list list-comments"
              pageSize={4}
              style={{
                height: this.state.height,
                overflowX: 'hidden',
                overflowY: 'auto'
              }}
              // scrollRenderAheadDistance={500}
              onEndReached={() => this.loadMore()}
              onEndReachedThreshold={1}
              pullToRefresh={<PullToRefresh
                distanceToRefresh={40}
                refreshing={this.state.refreshing}
                onRefresh={()=>this.onRefresh()}
              />}
            /> : <div style={{
              marginTop: '60px', display: 'flex', justifyContent:'center'
            }}>
              <ActivityIndicator text='拼命加载中...'/>
            </div>
        }
      </div>
    )
  }
}
