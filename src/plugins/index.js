/**
 * 全局插件
 */
import Bus from './bus/index'
import InsertPage from './insertPage'
import ErrorHandler from './errorHandler'
// import WbNav from './wb-nav/index'

const plugins = [
  ErrorHandler,
  Bus,
  InsertPage
]
export default {
  install(Vue) {
    plugins.forEach((item) => {
      Vue.use(item)
    })
  }
}
