import React, { Component } from 'react'
import { ListView, ActivityIndicator, PullToRefresh, Toast} from 'antd-mobile'
import request from '@/api'
import '@/style/list.scss'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class CommonList extends Component {
  static propTypes = {
    requestUrl: PropTypes.string.isRequired,
    showTicket: PropTypes.bool.isRequired
  }
  static defaultProps = {
    showTicket: true
  }
  constructor () {
    super()
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
      isLoading: false,
      start: 0,
      page:1,
      maxPage: 1,
      listData: null,
      refreshing: false
    }
  }
  componentDidMount () {
    this.getData()
  }
  async getData () {
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
    const res = await request('POST', this.props.requestUrl, {...base})
    if(res && res.status === 200) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(res.data.subjects),
        height: document.documentElement.clientHeight,
        maxPage: Math.ceil((res.data.total)/10),
        listData: res.data.subjects,
        refreshing: false
      })
    } else {
      Toast.fail('网络错误', 1)
    }
  }
  onRefresh () {
    this.setState({refreshing: true})
    this.getData()
  }
  toDetail (e, item) {
    if (e.target.innerText === '购票') return
    this.props.history.push({
      pathname:'/movieDetail',
      state:{
        item
      },
    })
  }
  renderRow (item) {
    return <div className='list-item' onClick={(e)=> this.toDetail(e,item)}>
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
      <div className='ticket'>
        <div className='watched'>
          {
            item.collect_count > 10000 ? `${(item.collect_count/10000).toFixed(1)}万人看过` :
              `${item.collect_count}人看过`
          }
        </div>
        {
          this.props.showTicket &&
          <a href='http://m.maoyan.com' target="_blank">购票</a>  
        }
      </div>
    </div>
  }
  async loadMore () {
    this.state.start += 10
    this.state.page++
    if (this.state.page > this.state.maxPage || this.state.maxPage===1) return
    await this.setState({isLoading: true})
    let base = {
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      city: '成都',
      start: this.state.start,
      count: 10,
      client: 'no1',
      udid: 'no'
    }
    let res = await request('POST', this.props.requestUrl, {...base} )
    if (res.status === 200) {
      this.setState({
        isLoading: false,
        listData: this.state.listData.concat(res.data.subjects)
      }, () => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.listData)
        })
      }
      )
    }
  }
  render() {
    return (
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
          // renderSeparator={}
          className="am-list list-movie"
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
    )
  }
}

export default withRouter(CommonList)
