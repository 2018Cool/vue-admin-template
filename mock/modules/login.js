import Mock from 'mockjs'

export default [

  {
    url: '/account/getUserInfo',
    type: 'get',
    response: config => {
      return {
        code: '00000000',
        success: true,
        data: Mock.mock({
          name: '@cname()',
          roles: ['admin']
        })
      }
    }
  },

  {
    url: '/account/login',
    type: 'post',
    response: _ => {
      return {
        code: '00000000',
        success: true,
        data: {
          token: '12345678'
        }
      }
    }
  },
  {
    url: '/account/logout',
    type: 'post',
    response: _ => {
      return {
        code: '00000000',
        success: true
      }
    }
  }
]

