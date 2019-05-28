import 'normalize.css'

import './app.sass'

import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';

import axios from 'axios';
import VueAxios from 'vue-axios';
import * as VueGoogleMaps from 'vue2-google-maps';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(VueAxios, axios);
Vue.use(VueScrollTo);
Vue.use(InfiniteLoading, {});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD5g_ydCAPz2_9DhMw_qcjxCwP2axqIbJo',
    libraries: 'places'
  }
});

import { i18n } from '@/translations/i18n';

import App from './AdminApp.vue';
import router from '@/router/admin';
import store from '@/store/admin';
import '@/utils/filters'

Vue.config.productionTip = false;

Vue.prototype.$appType = "admin";

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
