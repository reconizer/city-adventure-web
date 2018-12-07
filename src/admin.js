import 'normalize.css'

import './app.sass'

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueScrollTo from 'vue-scrollto';

import en from '@/translations/en';
import pl from '@/translations/pl';

import axios from 'axios';
import VueAxios from 'vue-axios';
import * as VueGoogleMaps from 'vue2-google-maps';

import moment from 'moment';

Vue.use(VueAxios, axios);
Vue.use(VueScrollTo);
Vue.use(VueI18n);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD5g_ydCAPz2_9DhMw_qcjxCwP2axqIbJo',
    libraries: 'places'
  }
});

let currentLocale = localStorage.getItem('locale');

if(!currentLocale) {
  currentLocale = 'pl';

  localStorage.setItem('locale', currentLocale);
}

moment.locale(currentLocale);

const i18n = new VueI18n({
  locale: currentLocale,
  fallbackLocale: 'pl',
  messages: {
    en,
    pl
  }
});

Vue.use(i18n);

import App from './AdminApp.vue'
import router from '@/router/admin';
import store from '@/store/admin';

Vue.config.productionTip = false;

Vue.prototype.$appType = "admin";

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
