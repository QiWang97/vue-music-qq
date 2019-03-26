import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'

import '@/assets/js/data' // 数据库 注册即有全局方法

import 'font-awesome/css/font-awesome.min.css' // font-awesome 字体 css
import '@/assets/css/common.css' // css 通用样式 

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('@/assets/img/loading-bars.svg'),
  error: require('@/assets/img/loading_error.svg'),
  try: 3 // default 1
})

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {
  name: 'v-touch'
})

Vue.filter('nameArr', function (val) {
  if (Array.isArray(val)) {
    return val.map(item => {
      return item.name || ''
    }).join(' ')
  }
  return val
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')