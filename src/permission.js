import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })// NProgress configuration

function resetUrl() {
  const href = location.href
  if (!href.includes('?')) {
    return
  }
  let hash = location.hash

  let url = location.origin + location.pathname
  if (hash !== '') {
    if (hash.includes('?')) {
      hash = hash.split('?')[0]
      url += hash
    }
  }
  window.location.href = url
  location.reload()
}

function getUserInfo(next) {
  if (store.getters.roles.length === 0) {
    store.dispatch('GetInfo').then(res => {
      // 拉取用户信息
      next()
    }).catch((err) => {
      store.dispatch('LogOut').then(() => {
        Message.error(err || 'Verification failed, please login again')
        next({ path: '/' })
      }).catch(err => {
        console.log(err)
      })
    })
  } else {
    next()
  }
}

// 不重定向白名单
const whiteList =
  [
    '/login', // 登入页
    '/fgpw', // 忘记密码
    '/regist', // 注册页
    '/wechat', // 微信注册页
    '/registMail', // 手机以及邮箱注册页
    '/perfectinfo', // 完善个人信息流程
    '/binding'// 绑定信息
  ]
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (store.getters.token) {
    if (to.query && to.query.JWT) {
      await store.dispatch('SetToken', to.query.JWT)
      resetUrl()
    }
    if (to.path === '/login') {
      next({ path: '/home' })// 登入状态直接进入登录页面
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      getUserInfo(next)
    }
  } else if (to.query && to.query.JWT) {
    await store.dispatch('SetToken', to.query.JWT)
    resetUrl()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
