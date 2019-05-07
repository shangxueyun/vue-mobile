import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routesS from './router'
import APIFunc from "./api";

import  { LoadingPlugin } from 'vux'
import  { AlertPlugin } from 'vux'
//import  CPdf from './components/PDF'
import './assets/css/style-index.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
/* 使用px：import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog'; */


Vue.config.productionTip = false
Vue.prototype.APIFunc = APIFunc

Vue.use(VueRouter)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
//Vue.component(CPdf.name, CPdf)

let routes = routesS.routes
const router = new VueRouter({
  mode: 'history',
  routes
});

//拦截器针对注册不能加
// router.beforeEach((to, from, next) => {
//   let token = window.sessionStorage.token;
//   if (to.path == '/login') {
//     window.sessionStorage.removeItem("token");
//     window.sessionStorage.removeItem("memberId");
//     window.sessionStorage.removeItem("phone");
//     window.sessionStorage.removeItem("companyInfo");
//   }
//   if(!token&&to.path != '/login')
//   {
//     return next({ path: '/login' });
//   }else{
//     next();
//   }
// })
// let toURL = null
// router.beforeEach((to, from, next) => {

  
//   if (toURL === to.path) {
//     next()
//   }
//   if (to.path !== from.path) {
//     debugger
//     toURL = to.path
//     router.replace()
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
