import Vue from 'vue';
import VueRouter from 'vue-router';
import App from "./App.vue"
import Home from './views/Home.vue';
import Historico from './views/Historico.vue';
import Login from './views/Login.vue';
import Guard from './services/middleware'
import vuetify from './plugins/vuetify';
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css'
import "./plugins/vuetify-money.js";
import "./plugins/axios.js";


Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueSidebarMenuAkahon);



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
      path: '/historico', 
      name: 'historico',
      component: Historico, 
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