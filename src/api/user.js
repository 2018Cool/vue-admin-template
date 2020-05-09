
import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/account/user/list',
    method: 'get',
    params
  })
}

// 新建用户
export function createUser(data) {
  return request({
    url: '/account/user/create',
    method: 'post',
    data
  })
}

// 获取用户详情
export function getUserDetail(params) {
  return request({
    url: '/account/user/detail',
    method: 'get',
    params
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/account/user/update',
    method: 'post',
    data
  })
}

// 删除用户
export function delUser(data) {
  return request({
    url: '/account/user/del',
    method: 'post',
    data
  })
}

// 获取策略
export function getStrategy(params) {
  return request({
    url: '/account/user/strategy',
    method: 'get',
    params
  })
}
