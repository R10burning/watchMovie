import axios from 'axios'
 
axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 响应拦截设置
 */
axios.interceptors.response.use(res => res,
  error => {
    if (error.response) {
      // switch (error.response.status) {
      //   case 401:
      //     storage.remove('userInfo')
      //     return router.replace({ // 跳转到登录页面
      //       path: '/login',
      //       query: {
      //         redirect: router.currentRoute.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
      //       }
      //     })
      // }
    }
    return Promise.reject(error)
  })
 
/**
 * 通用请求方法
 * @method:请求方法 string
 * @url:接口 string
 * @data: 参数 Object
 */
 
export default async (method = 'POST', url = '', data) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  try {
    // if (url.includes('api/auth/oauth/token')) headers['Authorization'] = 'Basic bW9iaWxlOjEyMzQ1Ng=='
    // else {
    // const token = storage.get('userInfo').token
    // headers['Authorization'] = token
    // }
    let res = await axios({
      method,
      url: url,
      data,
      headers,
      transformRequest: [data => {
        // Do whatever you want to transform the data
        let ret = ''
        for (const it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }]
    })
    return res
  } catch (err) {
    console.log(err)
  }
}
 
/* 上传图片 */
async function upload (url, arrData) {
  // const token = storage.get('userInfo').token
  const headers = {
    // 'Authorization': token,
    'Content-Type': 'multipart/form-data'
  }
  let fileData = new FormData()
  if (arrData.length > 0 ) {
    arrData.map(item => {
      fileData.append('photo',item)
    })
  }
  try {
    let res = await axios({
      method: 'POST',
      url: url,
      data: fileData,
      headers
    })
    return res
  } catch (err) {
    console.log(err)
  }
}
// export {
//   upload,
// }