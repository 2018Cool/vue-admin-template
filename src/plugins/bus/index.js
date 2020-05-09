// 消息数据总线插件，全局可用
export default {
  install(Vue) {
    const bus = new Vue({})
    if (!Vue.$bus) {
      Vue.$bus = bus
    } else {
      Vue.$bus = bus
    }

    Vue.mixin({
      created() {
        if (!this.$bus) {
          this.$bus = bus
        }
      }
    })
  }
}
