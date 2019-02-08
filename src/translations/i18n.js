import Vue from 'vue';
import VueI18n from 'vue-i18n';

import moment from 'moment';

import en from './lang/en'
import pl from './lang/pl'

let currentLocale = localStorage.getItem('locale');

if(!currentLocale) {
  currentLocale = 'pl';

  localStorage.setItem('locale', currentLocale);
}

moment.locale(currentLocale);

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: currentLocale,
  fallbackLocale: 'pl',
  messages: {
    en,
    pl
  }
});

