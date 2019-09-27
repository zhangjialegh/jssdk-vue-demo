export default {
  install(Vue, options) {
    Vue.global = Vue.prototype.$global = {
      /**
       * 等待提示
       *
       * param:
       *   {
       *      text: 等待提示信息
       *   }
       *
       * 示例：
       *   Vue.biz.loading({text:'加载中...'})
       */
      loading: function (param) {
        Vue.eventBus.$emit('loading', param)
      },
      /**
       * 隐藏等待提示
       *
       * 示例：
       *   Vue.biz.unloading()
       */
      unloading: function () {
        Vue.eventBus.$emit('unloading')
      },
      /**
       * 弹出提示
       *
       * param:
       *   {
       *      msg: 提示信息，必填
       *      type: 提示类型，共四种:success,warn,cancel,text，默认为text
       *      time: 消息停留时间，默认为2000，表示2000毫秒
       *      width: 提示组件的宽度，默认为7.6em
       *      mask: 是否显示遮罩，如果显示，将无法点击页面上的其他元素，默认为true
       *      position: 显示位置，共四种：default,top,middle,bottom，默认为default
       *   }
       *
       * 示例：
       *   Vue.biz.toast({msg:'你好'})
       *   Vue.biz.toast({msg:'保存成功',type:'success',time:1000,width:'90%',mask:false,position:'top'})
       */
      toast: function (param) {
        Vue.eventBus.$emit('toast', param)
      },
      /**
       * 警告提示
       *
       * param:
       *   {
       *      title: 警告框的标题
       *      msg: 警告信息
       *      callback: 回调函数
       *      scope: 回调函数的执行域
       *   }
       *
       * 示例：
       *   Vue.biz.alert({
       *     title: '提示',
       *     msg: '请输入...',
       *     callback: function() {
       *     },
       *     scope: me
       *   })
       */
      alert: function (param) {
        Vue.eventBus.$emit('alert', param)
      },
      /**
       * 确认提示
       *
       * param:
       *   {
       *      title: 确认框的标题
       *      msg: 确认提示信息
       *      callback: 回调函数，如果该函数返回false，将阻止确认提示组件的隐藏
       *      scope: 回调函数的执行域
       *   }
       *
       * 示例：
       *   Vue.biz.confirm({
       *     title: '提示',
       *     confirmText: '默认值”确认“ (confirm)确认按钮的显示文字'
       *     cancelText: '默认值”取消“ (cancel)取消按钮的显示文字'
       *     msg: '您确认要隐藏该按钮吗？',
       *     callback: function() {
       *       let thiz = this
       *       thiz.hide()
       *       setTimeout(function() {
       *         thiz.show()
       *       }, 1000)
       *     },
       *     scope: me
       *   })
       */
      confirm: function (param) {
        Vue.eventBus.$emit('confirm', param)
      },
      clearAccount () {
        localStorage.clear()
      }
    }
  }
}