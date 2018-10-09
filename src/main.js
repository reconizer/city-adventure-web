import 'normalize.css'

import './app.sass'

import Vue from 'vue'
import router from './router'
import store from './store'

import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app');
