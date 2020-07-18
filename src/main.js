import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementsUI from 'element-ui';
import {Loading} from 'element-ui';
import {Notification} from 'element-ui';
import {MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'


Vue.use(ElementsUI, Loading, Notification, MessageBox);


axios.defaults.baseURL = process.env.VUE_APP_BACKEND_HOST;

axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use( function (config) {
  if (store.state.user.isLoggedIn) {
    const token = store.state.user.token;
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(undefined, (error) => {
  if (error.response.status === 401) {
    store.dispatch('user/logOut');
  }
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

// set language to EN
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
