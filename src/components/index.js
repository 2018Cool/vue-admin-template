// 注册全局component
import WbButton from './WbButton'
import WbDialog from './WbDialog'
import WbTable from './WbTable'
import WbTooltip from './WbTooltip'
import WbSearch from './WbSearch'
import WbIcon from './WbIcon'
import WbList from './WbList'
const components = [
  WbButton,
  WbDialog,
  WbTable,
  WbTooltip,
  WbSearch,
  WbIcon,
  WbList
]
export default {
  install(Vue) {
    components.forEach((item) => {
      Vue.component(item.name, item)
    })
  }
}
