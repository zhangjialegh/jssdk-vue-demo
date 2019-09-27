<template>
  <div>
    <button @click="getToken">获取token</button>
    <button @click="wxLogin">登录</button>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    getToken() {
      const url = location.origin + location.pathname + location.search

      this.$http.request({
        methods: 'get',
        url: '/api/wechat/token?url='+url
      })
      .then(res => {
        console.log(res, 'ressss')
      })
    },
    wxLogin() {
      const url = location.origin+'/login'
      this.$http.request({
        methods: 'get',
        url: '/api/wechat/wxcode?url='+encodeURIComponent(url)
      })
      .then(res=> {
        console.log(res, 'codecode')
        location.href = res.data.data
      })
    }
  }
}
</script>
<style lang="less">
  
</style>