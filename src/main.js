// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import 'babel-polyfill'
import Vuex from 'vuex'
import store from './store'
import FastClick from 'fastclick'
import ElementUI from 'element-ui';
import 'element-theme-chalk';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import global_ from './components/page/Global'
import axios from 'axios'
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
Vue.prototype.$ajax = axios;
//const FastClick = require('fastclick')？？import he require的区别，require可以用在任何地方


Vue.config.productionTip = false
FastClick.attach(document.body)//减少点击延迟 那个是点击按钮
/* eslint-disable no-new */
Vue.use(ElementUI, { size: 'small' });
new Vue({
  el: '#app',
  router,
  Vuex,
  store,
  components: { App },
  template: '<App/>',
})
