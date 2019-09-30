<template>
  <div id="app">
    <router-view></router-view>
    <div v-transfer-dom>
      <toast v-model="showToast" :type="toastParam.type" :time="toastParam.time" :width="toastParam.width" :is-show-mask="toastParam.mask" :position="toastParam.position">{{toastParam.msg}}</toast>
    </div>
    <div v-transfer-dom>
      <alert v-model="showAlert" :title="alertParam.title" @on-hide="onAlert">{{alertParam.msg}}</alert>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading" :text="loadingParam.text"></loading>
    </div>
    <div v-transfer-dom>
      <confirm :class="{comfirmDialog:true}" v-model="showConfirm" :close-on-confirm="false" :title="confirmParam.title" :confirm-text="confirmParam.confirmText" :cancel-text="confirmParam.cancelText" :hide-on-blur="confirmParam.hideOnBlur" @on-cancel="onConfirmCancel" @on-confirm="onConfirm">
        <p style="text-align:center">{{confirmParam.msg}}</p>
      </confirm>
    </div>
  </div>
  
</template>

<script>
import Vue from 'vue'
export default {
  name: 'app',
  data() {
    return {
      toastParam: {},
      showToast: false,
      loadingParam: {},
      showLoading: false,
      alertParam: {},
      showAlert: false,
      confirmParam: {},
      showConfirm: false,

    }
  },
  created () {
    this.eventInit()
  },
  methods: {
    eventInit() {
      const vm = this
      Vue.eventBus.$on('loading', (param) => {
        vm.loadingParam = param || {}
        vm.showLoading = true
      }, vm)
      Vue.eventBus.$on('unloading', function () {
        vm.showLoading = false
      }, vm)
      Vue.eventBus.$on('alert', (param) => {
        vm.alertParam = param
        vm.showAlert = !!param && !!param.msg
      }, vm)
      Vue.eventBus.$on('toast', (param) => {
        vm.toastParam = param
        vm.showToast = !!param && !!param.msg
      }, vm)
      Vue.eventBus.$on('confirm', (param) => {
        param.hideOnBlur = param.hideOnBlur === true
        vm.confirmParam = param
        vm.showConfirm = !!param && !!param.msg
      }, vm)
    },
    onAlert () {
      if (this.alertParam.callback) {
        this.alertParam.callback.apply(this.alertParam.scope || null)
      }
    },
    onConfirm () {
      let result = this.confirmParam.callback.apply(this.confirmParam.scope || null)
      if (result !== false) {
        this.showConfirm = false
      }
    },
    onConfirmCancel () {
      if (this.confirmParam.cancel) {
        this.confirmParam.cancel.apply(this.confirmParam.scope || null)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
