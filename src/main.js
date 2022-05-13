import Vue from 'vue';
import VueRouter from 'vue-router';
import App from "./App.vue"
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Guard from './services/middleware'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import "./plugins/vuetify-money.js";
import "./plugins/axios.js";


Vue.config.productionTip = false;

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history', 
  base: __dirname,
  routes: [
    { 
      path: '/home', 
      name: 'home',
      component: Home, 
      beforeEnter: Guard.auth
    },
    { 
      path: '/', 
      name: 'login',
      component: Login
    },
  ]
});

new Vue({
  router,
  vuetify,
  template: '<App/>',
  render: h => h(App)
}).$mount('#app');