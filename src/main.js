import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'

import '@/assets/js/data' // 数据库 注册即有全局方法

import 'font-awesome/css/font-awesome.min.css' // font-awesome 字体 css
import '@/assets/css/common.css' // css 通用样式 
import '@/assets/js/touch' // 注册触屏指令，导入即生效


Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: './assets/img/loading-bars.svg',
  error: './assets/img/loading_error.svg',
  try: 1 // default 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
