import Vue from 'vue'
import router from './router'
import store from './store'
import Vux from './vux'
import Bus from './bus'
import Ajax from './ajax'
import Global from './global'
import { api } from './config'


import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vux)
Vue.use(Bus)
Vue.use(Global)
Vue.use(Ajax, {api})
Vue.router = router
Vue.store = store



let accountJson = localStorage.getItem('account')
if (accountJson) {
  store.commit('account', JSON.parse(accountJson))
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
