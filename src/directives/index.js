import waves from './waves'

const directives = [
  waves
]
export default {
  install(Vue) {
    directives.forEach((item) => {
      Vue.directive(item.name, item)
    })
  }
}
