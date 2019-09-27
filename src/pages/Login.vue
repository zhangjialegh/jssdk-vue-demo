<template>
  <div>
    登录中...
  </div>
</template>
<script>
export default {
  created() {
    this.codeToToken()
  },
  methods: {
    getQueryString(name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      const r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
        return null
    },
    codeToToken() {
      const vm = this
      this.$http.request({
        method: 'get',
        url: '/api/wechat/userinfo?code='+this.getQueryString('code')
      })
      .then(res => {
        if (res.data.code === 200) {
          localStorage.setItem('account', JSON.stringify(res.data.data))
          vm.$store.commit('account', res.data.data)
          vm.$router.replace('/')
        }
      })
    }
  }
}
</script>