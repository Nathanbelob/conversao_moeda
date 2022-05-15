import Vue from 'vue'
import Axios from 'axios'
import Router from 'vue-router'

Vue.prototype.$http = Axios;
Vue.use(Router)
// Get token in local storage or query url
let token = localStorage.token

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}
Vue.prototype.$http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = process.env.VUE_APP_URL
  }
});
