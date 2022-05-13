import Vue from 'vue'
import Axios from 'axios'
import store from '@/store'
import { returnNewFileName } from '@/helpers'

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_BASE_URI_API_INFINITE_SALES;

// Get token in local storage or query url
let token = localStorage.getItem('token')

if (token) {
  // If the token is set, it is set as the default on all upcoming requests
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}