import 'normalize.css'

import './app.sass'

import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
import router from './router';
import store from './store';

import axios from 'axios';
import VueAxios from 'vue-axios';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueAxios, axios);
Vue.use(VueScrollTo);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD5g_ydCAPz2_9DhMw_qcjxCwP2axqIbJo'
  }
});

import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
