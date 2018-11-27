import api from '@/api'

import moment from 'moment'

import {
  CLEAR_OVERVIEW,
  SET_OVERVIEW_SUMMARY, SET_OVERVIEW_PURCHASES,
  SET_OVERVIEW_VIEWS, SET_OVERVIEW_RATINGS,

  CLEAR_USER_PROGRESS,
  SET_USER_PROGRESS_PARTICIPANTS, SET_USER_PROGRESS_RANKINGS,
  SET_USER_PROGRESS_TIP_USAGE, SET_USER_PROGRESS_TIME_SPENT_PER_POINT,

  SET_LOADING, SET_ERROR
} from './mutation-types'

import {
  LOAD_ANALYTICS_OVERVIEW,
  LOAD_ANALYTICS_USER_PROGRESS
} from './action-types'

export default {
  namespaced: true,
  state: {
    overview: {
      summary: {},
      purchases: [],
      views: [],
      ratings: {}
    },
    userProgress: {
      participants: {},
      rankings: [],
      tipUsage: [],
      timeSpentPerPoint: []
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
    /**
     * OVERVIEW
     */
    [CLEAR_OVERVIEW] (state) {
      state.overview.purchases = [];
      state.overview.views = [];
      state.overview.ratings = {};
      state.overview.rankings = {};
    },

    [SET_OVERVIEW_SUMMARY] (state, summary) {
      state.overview.summary = summary;
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

    /**
     * USER PROGRESS
     */
    [CLEAR_USER_PROGRESS] (state) {
      state.userProgress.participants = {};
      state.userProgress.rankings = [];
      state.userProgress.tipUsage = [];
      state.userProgress.timeSpentPerPoint = [];
    },

    [SET_USER_PROGRESS_PARTICIPANTS] (state, participants) {
      state.userProgress.participants = participants;
    },

    [SET_USER_PROGRESS_RANKINGS] (state, rankings) {
      state.userProgress.rankings = rankings;
    },

    [SET_USER_PROGRESS_TIP_USAGE] (state, tipUsage) {
      state.userProgress.tipUsage = tipUsage;
    },

    [SET_USER_PROGRESS_TIME_SPENT_PER_POINT] (state, timeSpentPerPoint) {
      state.userProgress.timeSpentPerPoint = timeSpentPerPoint;
    },

    /**
     * GENERAL
     */
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

      let start = moment().subtract(30, 'days').toDate();
      let end = moment().toDate();

      return Promise.all([
        api.analytics.overview.summary(id, start, end),

        api.analytics.overview.purchases(id, start, end),
        api.analytics.overview.views(id, start, end),
        api.analytics.overview.ratings(id, start, end)
      ]).then( (values) => {
        commit(SET_OVERVIEW_SUMMARY, values[0].data.overview);

        commit(SET_OVERVIEW_PURCHASES, values[1].data.statistics);
        commit(SET_OVERVIEW_VIEWS, values[2].data.statistics);
        commit(SET_OVERVIEW_RATINGS, values[3].data.ratings);

        commit(SET_LOADING, false);
      })
      .catch( error => {
        commit(SET_ERROR, error);
      })
    },

    [LOAD_ANALYTICS_USER_PROGRESS] ({ commit }, { id }) {
      commit(CLEAR_USER_PROGRESS);

      commit(SET_LOADING, true);

      let start = moment().subtract(30, 'days').toDate();
      let end = moment().toDate();

      return Promise.all([
        api.analytics.userProgress.participants(id, start, end),
        api.analytics.userProgress.rankings(id, start, end),
        api.analytics.userProgress.tipUsage(id, start, end),
        api.analytics.userProgress.timeSpentPerPoint(id, start, end),
      ]).then( (values) => {
        commit(SET_USER_PROGRESS_PARTICIPANTS, values[0].data.participants);
        commit(SET_USER_PROGRESS_RANKINGS, values[1].data.rankings);
        commit(SET_USER_PROGRESS_TIP_USAGE, values[2].data.tip_usage);
        commit(SET_USER_PROGRESS_TIME_SPENT_PER_POINT, values[3].data.time_spent);

        commit(SET_LOADING, false);
      })
      .catch( error => {
        commit(SET_ERROR, error);
      })
    }
  }
}
