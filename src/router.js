import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  mode:'history',
  routes: [
    { path: '/', name: 'home', component: () => import('./pages/Home.vue'), meta: { needLogin:false }},
    { path: '/login', name: 'login', component: () => import('./pages/Login.vue'), meta: { needLogin:false }},
  ]
})


router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (Vue.store.state.account && Vue.store.state.account.token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router