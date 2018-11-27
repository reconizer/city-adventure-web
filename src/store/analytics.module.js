import api from '@/api'

import moment from 'moment'

import {
  SET_LOADING, SET_ERROR,
  SET_OVERVIEW_PURCHASES,
  SET_OVERVIEW_VIEWS,
  SET_OVERVIEW_RATINGS,
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
      ratings: {}
    },
    userProgress: {
      completion: {},
      rankings: [],
      tipUsage: []
    },
    monetization: {
    },

    loading: false,
    error: null
  },
  getters: {
    overviewPurchases: (state) => {
      if(state.overview.purchases.length == 0) {
        return 0;
      }

      return state.overview.purchases.map(item => item.data).reduce((a, b) => a + b);
    },
    overviewViews: (state) => {
      if(state.overview.views.length == 0) {
        return 0;
      }

      return state.overview.views.map(item => item.data).reduce((a, b) => a + b);
    },

    overviewRatingsCount: (state) => {
      return state.overview.ratings.rating_5 +
        state.overview.ratings.rating_4 +
        state.overview.ratings.rating_3 +
        state.overview.ratings.rating_2 +
        state.overview.ratings.rating_1
    },
    overviewRating: (state, getters) => {
      let total = 5 * state.overview.ratings.rating_5 +
        4 * state.overview.ratings.rating_4 +
        3 * state.overview.ratings.rating_3 +
        2 * state.overview.ratings.rating_2 +
        1 * state.overview.ratings.rating_1;

      let value = total / getters.overviewRatingsCount;

      return Math.round(value * 100 + Number.EPSILON) / 100;
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

    [SET_OVERVIEW_RATINGS] (state, ratings) {
      state.overview.ratings = ratings;
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
        api.analytics.views(id, moment().subtract(30, 'days').toDate(), moment().toDate()),
        api.analytics.ratings(id, moment().subtract(30, 'days').toDate(), moment().toDate())
      ]).then( (values) => {
        commit(SET_OVERVIEW_PURCHASES, values[0].data.statistics);
        commit(SET_OVERVIEW_VIEWS, values[1].data.statistics);
        commit(SET_OVERVIEW_RATINGS, values[2].data.ratings);

        commit(SET_LOADING, false);
      })
      .catch( error => {
        commit(SET_ERROR, error);
      })
    }
  }
}
