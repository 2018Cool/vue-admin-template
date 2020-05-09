import Vue from 'vue'
// import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VueClipboard from 'vue-clipboard2'
import '@/styles/index.scss' // global css
import 'font-awesome/scss/font-awesome.scss'
import 'echarts'

import App from './App'
import store from './store'
import router from './router'
import plugins from '@/plugins'
import components from '@/components'

import '@/icons' // icon
import '@/permission' // permission control
/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */

if (process.env.VUE_APP_ENV !== 'production') {
  require('../mock/index') // simulation data
}

Vue.use(ElementUI, { locale })
Vue.use(VueClipboard)
Vue.use(plugins)
Vue.use(components)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
