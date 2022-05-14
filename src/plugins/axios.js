import Vue from 'vue'
import Axios from 'axios'
import Router from 'vue-router'

Vue.prototype.$http = Axios;
Vue.use(Router)

// Get token in local storage or query url
let token = localStorage.token
console.log(this);

if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}
Vue.prototype.$http.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.log('aaaa', error.response);
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = "http://localhost:8080"
  }
});
