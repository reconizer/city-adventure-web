import api from '@/api'
import Vue from 'vue'

import router from '@/router'

import moment from 'moment'

import {
  SET_LOADING, SET_ERROR,
  SET_OVERVIEW_PURCHASES,
  SET_OVERVIEW_VIEWS,
  CLEAR_OVERVIEW
} from './mutation-types'

import {
  LOAD_ANALYTICS_OVERVIEW
} from './action-types'

export default {
  namespaced: true,
  state: {
    overview: {
      purchases: [],
      views: [],
      ratings: {},
      rankings: {}
    },
    userProgress: {
    },
    monetization: {
    },

    loading: false,
    error: null
  },
  getters: {
    overviewPurchases: (state) => {
      return state.overview.purchases.map(item => item.data).reduce((a, b) => a + b);
    },
    overviewViews: (state) => {
      return state.overview.views.map(item => item.data).reduce((a, b) => a + b);
    }
  },
  mutations: {
    [CLEAR_OVERVIEW] (state) {
      state.overview.purchases = [];
      state.overview.views = [];
      state.overview.ratings = {};
      state.overview.rankings = {};
    },

    [SET_OVERVIEW_PURCHASES] (state, purchases) {
      state.overview.purchases = purchases;
    },

    [SET_OVERVIEW_VIEWS] (state, views) {
      state.overview.views = views;
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, error) {
      console.log(error);
      state.error = error;
    }
  },
  actions: {
    [LOAD_ANALYTICS_OVERVIEW] ({ commit }, { id }) {
      commit(CLEAR_OVERVIEW);

      commit(SET_LOADING, true);

      return Promise.all([
        api.analytics.purchases(id, moment().subtract(30, 'days').toDate(), moment().toDate()),
        api.analytics.views(id, moment().subtract(30, 'days').toDate(), moment().toDate())
      ]).then( (values) => {
        commit(SET_OVERVIEW_PURCHASES, values[0].data.statistics);
        commit(SET_OVERVIEW_VIEWS, values[1].data.statistics);

        commit(SET_LOADING, false);
      })
      .catch( error => {
        commit(SET_ERROR, error);
      })
    }
  }
}
