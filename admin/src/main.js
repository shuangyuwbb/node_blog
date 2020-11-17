import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:3000/admin/api/'
// Vue.prototype.$http = axios

import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadPictureUrl(){
      return this.$http.defaults.baseURL + '/uploads'
    },
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthorization(){
      return {
        Authorizatio: `Bearer ${sessionStorage.token || ''}`
      }
    }
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
