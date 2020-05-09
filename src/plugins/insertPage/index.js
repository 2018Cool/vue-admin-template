
// 页面出栈入栈操作
export default {
  install(Vue) {
    const el = document.body
    function insertPage(store, router) {
      return function(page, data) {
        const Page = Vue.extend(page)
        const instance = new Page({ store: store, router: router, propsData: data }).$mount()
        el.appendChild(instance.$el)
        const dialog = instance.$children[0]
        if (dialog && dialog.display) {
          dialog.display()
          instance.$closeCallback = null
          instance.$callbackData = null
          instance.onDialogClosed = function(callback) { // 对话框关闭回掉函数
            instance.$closeCallback = callback
          }
          dialog.$onClosed = function() {
            if (instance.$closeCallback) {
              instance.$closeCallback(instance.$callbackData)
            }
            instance.$destroy()
          }
          return instance
        } else {
          console.error('$showDialog方法只能用于基于WbDialog实现的component')
        }
      }
    }
    Vue.mixin({
      created() {
        if (!this.$showDialog) {
          this.$showDialog = insertPage(this.$store, this.$router)
        }
      }

    })
  }
}

