import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibm9tZSI6IlBhdWxvIEx1aXoiLCJlbWFpbCI6InBhdWxvQHBhdWxvLmNvbSIsImlhdCI6MTU3NDEwOTg5OCwiZXhwIjoxNTgyNzQ5ODk4fQ.ki7GDXCs3D3vRVsEOkgpovU4nEVhwlEDJg1ldMFJO8s'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')