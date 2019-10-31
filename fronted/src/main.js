import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibm9tZSI6InBhdWxvIiwiZW1haWwiOiJwYXVsb0BwYXVsby5jb20iLCJpYXQiOjE1NzI0NjA1MDAsImV4cCI6MTU4MTEwMDUwMH0.bFp4rXJZtN9VP1g_qighselMjInH_niaZzQHPYS0zQk'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')