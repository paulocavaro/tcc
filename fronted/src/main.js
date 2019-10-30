import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibm9tZSI6InBhdWxvIiwiZW1haWwiOiJwYXVsb0BwYXVsby5jb20iLCJpYXQiOjE1NzIzMDAwMTEsImV4cCI6MTU4MDk0MDAxMX0.dowsfS5HUrxvCGu2q11ZafRnM2hVH40nFHV5ILo7894'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')