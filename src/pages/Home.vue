<template>
  <div>
    <div id="qr_box"></div>
    <div class="avatar-box" v-if="avatar">
      <img :src="avatar" alt class="avatar" />
    </div>
    <button @click="getToken">获取token</button>
    <br />
    <button @click="loginOut" v-if="isLogin">退出</button>
    <button @click="wxLogin" v-else-if="isWechat">微信登录</button>
    <template v-else>
      <button @click="wxQrLogin">跳转扫码登录</button>
      <button @click="wxQrSelfLogin">内嵌扫码登录</button>
    </template>
  </div>
</template>
<script>
import { api } from "../config";
export default {
  data() {
    return {};
  },
  computed: {
    avatar() {
      return this.$store.state.account.wechatAvatarUri || "";
    },
    isLogin() {
      return !!this.$store.state.account.thirdSession;
    },
    isWechat() {
      return this.$global.isWechat();
    }
  },
  methods: {
    getToken() {
      const url = location.origin + location.pathname + location.search;
      this.$http
        .request({
          methods: "get",
          url: "/api/wechat/token?url=" + url
        })
        .then(res => {
          const data = res.data.data;
          // eslint-disable-next-line no-undef
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
          });
          // eslint-disable-next-line no-undef
          wx.ready(function() {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // eslint-disable-next-line no-undef
            wx.updateAppMessageShareData({
              title: "demo", // 分享标题
              desc: "自定义标题", // 分享描述
              link: api, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:
                "https://avatars2.githubusercontent.com/u/28124071?s=460&v=4", // 分享图标
              success: function() {
                // 设置成功
              }
            });
            // eslint-disable-next-line no-undef
            wx.updateTimelineShareData({
              title: "demo", // 分享标题
              link: api, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "", // 分享图标
              success: function() {
                // 设置成功
              }
            });
          });
        });
    },
    wxLogin() {
      const url = location.origin + "/login";
      this.$http
        .request({
          methods: "get",
          url: "/api/wechat/wxcode?url=" + encodeURIComponent(url)
        })
        .then(res => {
          location.href = res.data.data;
        });
    },
    wxQrLogin() {
      const url = location.origin + "/login";
      this.$http
        .request({
          methods: "get",
          url: "/api/wechat/wxcode?url=" + encodeURIComponent(url) + "&web=1"
        })
        .then(res => {
          location.href = res.data.data;
        });
    },
    wxQrSelfLogin() {
      new WxLogin({
        self_redirect: false,
        id: "qr_box",
        appid: "wx827225356b689e24",
        scope: "snsapi_login",
        redirect_uri: "https://qq.jd.com/new/wx/callback.action?view=null",
        state: Date.now(),
        style: "",
        href: ""
      });
    },
    loginOut() {
      this.$store.commit("account", {});
      localStorage.clear();
    }
  }
};
</script>
<style lang="less">
.avatar-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
  > img {
    width: 100%;
    height: 100%;
  }
}
</style>