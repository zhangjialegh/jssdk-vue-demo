import {
  TransferDom,
  Toast,
  Loading,
  Alert,
  Confirm,
  Popover,
  XDialog
} from 'vux'

const components = [
  Toast,
  Loading,
  Alert,
  Confirm,
  Popover,
  XDialog,
]

export default {
  install (Vue) {
    Vue.directive('transfer-dom', TransferDom)
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
