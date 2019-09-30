import axios from 'axios'
export default {
  install (Vue, options) {
    axios.defaults.baseURL = options.api
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.post['Accept'] = 'application/json; charset=utf-8, text/plain, */*'
    axios.defaults.headers.put['Content-Type'] = 'application/json'
    axios.defaults.headers.put['Accept'] = 'application/json; charset=utf-8, text/plain, */*'
    axios.defaults.withCredentials = true

    axios.interceptors.request.use(function (request) {
      let account = Vue.store.state.account || localStorage.getItem('account')
      if (typeof account === 'string') {
        account = JSON.parse(account)
      }
      if (account && account.thirdSession) {
        request.headers.authorization = account.thirdSession
      }

      let url = request.url
      let tpi = url.indexOf('_t=')
      if (tpi !== -1) {
        url = url.substring(0, tpi - 1)
      }

      let c = url.indexOf('?') === -1 ? '?' : '&'
      request.url = `${url}${c}_t=${parseInt(new Date().getTime() / 1000, 10)}`

      if (request.autoLoading) {
        Vue.global.loading()
      }

      return request
    }, error => Promise.reject(error))

    axios.interceptors.response.use(function (response) {
      if (response.config.autoLoading) {
        Vue.global.unloading()
      }
      return response
    }, function (error) {
      let response = error.response
      if (response) {
        let data = response.data || {}

        if (response.status === 504) {
          if (!error.config.timeOutStyle || error.config.timeOutStyle === 'page') {
            Vue.global.toast({ msg: '请求超时', width: '70%', time: 4000, mask: false })
          } else if (error.config.timeOutStyle === 'toast') {
            Vue.global.toast({ msg: '服务不可用', width: '70%', time: 4000, mask: false })
          }
        } else if (data.code === 401) {
          Vue.global.clearAccount()
          Vue.router.replace({path: 'home'})
        } else {
          if (data.msg) {
            Vue.global.toast({ msg: data.msg, width: '70%', mask: false })
          } else {
            Vue.global.toast({ msg: '请求超时', width: '70%', time: 4000, mask: false })
          }
        }
      } else {
        Vue.global.toast({ msg: `请求失败`, width: '70%', mask: false })
      }
      return Promise.reject(error)
    })
    Vue.prototype.$http = axios
    Vue.http = axios
  }
}
