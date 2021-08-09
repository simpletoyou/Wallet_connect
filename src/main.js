// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import Mui from 'vue-awesome-mui';
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import global from './global'
import axios from 'axios'


import Vant from 'vant';
import VueJsonp from 'vue-jsonp'

import 'default-passive-events'


import {
  Toast
} from "vant";

Vue.use(Vant);
Vue.use(VueJsonp)
Es6Promise.polyfill()

// 设置请求接口响应时间为10000ms
axios.defaults.timeout = 10000;

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error && error.stack.indexOf('timeout') > -1) {
      Toast('请求超时')
			// console.log('请求超时')
    }

  }
);

Vue.prototype.global = global


Vue.use(MintUI)
Vue.use(Mui);
// import $ from 'jquery'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
