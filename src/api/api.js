/* 接口 */
export default {
  // 登录接口口
  login: '/api/auth/oauth/token',
  // 用户信息
  userInfo: '/api/admin/user/getUserInfo',
  // 招聘信息
  recuritInfo: '/api/recruit/campus/findList',
  // 招聘详情
  recuritDetail: '/api/recruit/campus/detail',
  //分享app
  shareapp: '/api/shareapp/app',
  //校车时刻
  schoolbus: '/api/schoolbus/front/schoolbus',
  //校历
  schoolcalendar: '/api/schoolCalendar/getSchoolCalendarBySemester',
  //学生课程表
  getScheduleList: '/api/schedule/getScheduleList',
  //根据日期查询空教室
  classByDate: '/api/emptyclass/classByDate',
  //根据教学楼查询空教室
  classDetail: '/api/emptyclass/classDetail',
  //空教室高级查询
  search: '/api/emptyclass/serach',
  //一卡通余额
  onecardBalance: '/api/onecard/front/balance',
  //一卡通消费记录
  onecardRecord: '/api/onecard/front/record',
  //奖学金信息
  scholarship: '/api/scholarship/detail',
  //获取学年
  getSchoolYear: '/api/schedule/getSchoolYear',
  getSchoolSemesterInfo: '/api/schedule/getSemesterInfo',
  //根据学年获取学期
  getSemesterByYear: '/api/schedule/getSemesterByYear',
  //根据学年学期获取周数
  getPeriodBySemester: '/api/schedule/getPeriodBySemester',
  //学校概况
  schoolAbout: '/api/aboutschool/getAboutSchoolMes',
  //专业介绍
  introduce: '/api/introduce/getMajorIntroduceList',
  //专业介绍详情
  introduceDetail:'/api/introduce/getMajorIntroduceChildList',
  //校长邮箱页面
  mailboxList:'/api/mailbox/mailbox/getIsPrincipalByAll',
  //校长详情页面
  mailboxDetail:'/api/mailbox/mailbox/getPrincipalById',
  //意见提交
  mailboxComment:'/api/mailbox/mailbox/commentSubmitted',
  //校长回复
  mailboxReply:'/api/mailbox/mailbox/replyPrincipal',
  //奖惩查询
  reward: '/api/rewardpunish/detail',
  // 失物招领
  lostList: '/api/lostAndFound/lostList',
  // 寻物启事
  foundList: '/api/lostAndFound/foundList',
  //我发布的失物招领信息
  myselfData: '/api/lostAndFound/myselfData',
  // 失物招领保存
  saveLostOrFound: '/api/lostAndFound/saveLostOrFound',
  // 失物招领详情
  lostFoundDetail: '/api/lostAndFound/detail',
  //删除我发布的失物招领
  deleteFoundInfo: '/api/lostAndFound/deleteFoundInfo',
  // 跳蚤市场物品信息发布
  fleaNewGoods: '/api/fleaMarket/market/save',
  // 跳蚤图片上传
  fleaPic: '/api/tool/fast/avatar/uploadPhotos',
  // 跳蚤市场首页数据
  fleaHome: '/api/fleaMarket/market/findList',
  // 跳蚤市场商品详情
  fleaDetail: '/api/fleaMarket/market/detail',
  // 跳蚤市场我的发布
  fleaMyGoods: '/api/fleaMarket/market/myGoods',
  // 跳蚤市场个人中心
  meInfo: '/api/admin/user/front/info',
  // 跳蚤市场删除发布
  fleaDel: '/api/fleaMarket/market/delete',
  // 跳蚤市场删除发布图片
  fleaDelPic: '/api/fleaMarket/market/deletePic',
  // 跳蚤市场收藏列表
  fleaCollectionList: '/api/fleaMarket/collection/findList',
  // 跳蚤市场收藏
  fleaCollection: '/api/fleaMarket/collection/save',
  // 跳蚤市场取消收藏
  fleaCollectionDel: '/api/fleaMarket/collection/delete',
  //获取通知公告首页接口
  getNoticeInfoList:'/api/portal/notice/getNoticeInfoList',
  //获取通知公告详情接口
  getNoticeInfoDetail:'/api/portal/notice/getNoticeInfoDetail',
  //新闻栏目列表
  newsTypeList: '/api/portal/newsType/getTypeList',
  //根据栏目获取栏目下的新闻
  newsList: '/api/portal/newsInfo/getNewsByType',
  //根据获取推荐新闻
  getTopNews: '/api/portal/newsInfo/getTopNews',
  //新闻详情
  newsDetail:'/api/portal/newsInfo/getNewsDetail',
 
  //一卡通数据分析统计H5
  specialDay:'/api/swjtuOnecard/consum/yearConsumData',
}