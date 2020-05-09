import request from '@/utils/request'

// 账号登录
export function login(emailOrTel, password) {
  return request({
    url: '/account/login',
    method: 'post',
    data: {
      emailOrTel,
      password
    }
  })
}

// 获取用户信息
export function getInfo(data) {
  return request({
    url: '/account/getUserInfo',
    method: 'get',
    data
  })
}

// 登出
export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}
