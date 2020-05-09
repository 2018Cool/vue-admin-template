// 异常捕获插件
export default {
  install(Vue) {
    Vue.config.errorHandler = function(err, vm, info) {
      console.error(err)
    }
    window.addEventListener('unhandledrejection', function(e) {
      e.preventDefault()
      console.error('捕获到promise reject：', e)
      return true
    })
  }
}
