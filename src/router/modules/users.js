// 工单

import Layout from '@/layout'

const ticketRouter = {
  path: '/users',
  component: Layout,
  name: 'users',
  redirect: '/users/list',
  meta: {
    title: '用户管理', icon: 'users'
  },
  children: [
    {
      name: 'list',
      path: 'list',
      component: () => import('@/views/users/index')
    }
  ]
}

export default ticketRouter
