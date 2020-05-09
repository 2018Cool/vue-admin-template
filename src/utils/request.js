import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// axios.defaults.headers.common['Authorization'] = getToken()
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // store.dispatch('MsgUnm', 1577429639650)
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      // config.headers['Authorization'] = getToken()
      config.headers['Token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log('==', error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.code === 401) {
      store.dispatch('LogOut').then(() => {
        location.reload()
      })
    } else {
      const res = response.data
      if (!res.success) {
        let msg = res.msg
        if (!msg) {
          // 弹出错误码集合没定义的消息
          msg = `请求失败(${res.code})`
        }
        Message({
          message: msg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject('error')
      } else {
        return res
      }
    }
  },
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch('LogOut').then(() => {
        location.reload()
      })
    }
    console.log('err==', error) // for debug
    Message({
      // message: error.message,
      message: '请求超时,请刷新重试!',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
