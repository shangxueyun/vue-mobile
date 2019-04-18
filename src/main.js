import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routesS from './router'
import APIFunc from "./api";

import  { LoadingPlugin } from 'vux'
import  { AlertPlugin } from 'vux'
import './assets/css/style-index.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
/* 使用px：import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog'; */


Vue.config.productionTip = false
Vue.prototype.APIFunc = APIFunc

Vue.use(VueRouter)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

let routes = routesS.routes
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
