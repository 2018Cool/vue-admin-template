import Mock from 'mockjs'

const List = []
const count = 100
const Strategies = []

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    name: '@cname()',
    lastTime: '@datetime'
    // content_short: 'mock data',
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // platforms: ['a-platform']
  }))
  Strategies.push(Mock.mock({
    id: '@increment',
    name: '@name()',
    desc: '@cparagraph'
    // content_short: 'mock data',
    // forecast: '@float(0, 100, 2, 2)',
    // importance: '@integer(1, 3)',
    // 'type|1': ['CN', 'US', 'JP', 'EU'],
    // 'status|1': ['published', 'draft'],
    // display_time: '@datetime',
    // comment_disabled: true,
    // pageviews: '@integer(300, 5000)',
    // platforms: ['a-platform']
  }))
}

export default [
  {
    url: '/account/user/list',
    type: 'get',
    response: config => {
      const { param, pageNum = 1, pageSize = 20 } = config.query

      const mockList = List.filter(item => {
        if (param && item.name.indexOf(param) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

      return {
        code: '00000000',
        message: '成功',
        success: true,
        data: {
          list: pageList,
          pageNum,
          pageSize,
          totalCount: mockList.length
        }
      }
    }
  },

  {
    url: '/account/user/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      return {
        code: '00000000',
        success: true,
        data: Mock.mock({
          id: id,
          name: '@cname()',
          createTime: '@datetime',
          remark: '@cparagraph(10,30)',
          accessMode: ['api', 'web'],
          accesskey: /\w{32}$/,
          secretkey: /\w{24}$/,
          'passwordType|1': ['auto', 'custom'],
          password: /^[a-z][\w]{7,19}$/,
          strategies: Strategies.filter(item => item.id < 10)

          // content_short: 'mock data',
          // forecast: '@float(0, 100, 2, 2)',
          // importance: '@integer(1, 3)',
          // 'type|1': ['CN', 'US', 'JP', 'EU'],
          // 'status|1': ['published', 'draft'],
          // display_time: '@datetime',
          // comment_disabled: true,
          // pageviews: '@integer(300, 5000)',
          // platforms: ['a-platform']
        })
      }
    }
  },

  {
    url: '/account/user/create',
    type: 'post',
    response: _ => {
      return {
        code: '00000000',
        success: true
      }
    }
  },

  {
    url: '/account/user/update',
    type: 'post',
    response: _ => {
      return {
        code: '00000000',
        success: true
      }
    }
  },
  {
    url: '/account/user/del',
    type: 'post',
    response: _ => {
      return {
        code: '00000000',
        success: true
      }
    }
  },
  {
    url: '/account/user/strategy',
    type: 'get',
    response: config => {
      const { param, pageNum = 1, pageSize = 20 } = config.query

      const mockList = Strategies.filter(item => {
        if (param && (item.name.indexOf(param) < 0 || item.desc.indexOf(param))) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

      return {
        code: '00000000',
        message: '成功',
        success: true,
        data: {
          list: pageList,
          pageNum,
          pageSize,
          totalCount: mockList.length
        }
      }
    }
  }
]

