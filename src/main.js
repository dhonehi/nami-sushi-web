import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementsUI from 'element-ui';
import {Loading} from 'element-ui';
import {Notification} from 'element-ui';
import {MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementsUI, Loading, Notification, MessageBox);
Vue.prototype.$http = axios;
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://95.216.143.170:9000'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
