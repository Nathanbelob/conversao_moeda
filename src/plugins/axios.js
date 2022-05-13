import Vue from 'vue'
import Axios from 'axios'

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_BASE_URI_API_INFINITE_SALES;

// Get token in local storage or query url
let token = localStorage.token

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}
