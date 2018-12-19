import api from '@/api';

import {
  SET_ADVENTURES, SET_TYPE,
  SET_COUNTERS, SET_TOTAL_PAGES,

  SET_LOADING, SET_ERROR
} from '@/store/mutation-types'

import {
  LOAD_ADVENTURES, CREATE_ADVENTURE,
  LOAD_COUNTERS
} from '@/store/action-types';

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_PENDING
} from '@/config'

export default {
  namespaced: true,
  state: {
    list: [],
    totalPages: 1,

    counters: {
      [ADVENTURES_PUBLISHED]: null,
      [ADVENTURES_IN_REVIEW]: null,
      [ADVENTURES_UNPUBLISHED]: null
    },

    currentType: null,
    loading: false,
    error: null
  },
  mutations: {
    [SET_ADVENTURES] (state, adventures) {
      state.list = adventures;
    },

    [SET_TOTAL_PAGES] (state, totalPages) {
      state.totalPages = totalPages;
    },

    [SET_TYPE] (state, type) {
      state.currentType = type;
    },

    [SET_COUNTERS] (state, counters) {
      state.counters = counters;
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, error) {
      state.error = error;
    }
  },
  actions: {
    [LOAD_COUNTERS] ({ commit }) {
      return api.admin.adventures.loadCounters()
        .then( response => {
          commit(SET_COUNTERS, response.data);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, error);
        })
    },

    [LOAD_ADVENTURES] ({ commit, state }, { adventureType, page, query, sort }) {
      commit(SET_LOADING, true);

      let action = null;

      if(state.currentType != adventureType) {
        commit(SET_ADVENTURES, []);
        commit(SET_TOTAL_PAGES, 0);

        commit(SET_TYPE, adventureType);
      }

      switch(adventureType) {
        default:
        case ADVENTURES_PUBLISHED:
          action = api.admin.adventures.loadPublished;
          break;
        case ADVENTURES_IN_REVIEW:
          action = api.admin.adventures.loadInReview;
          break;
        case ADVENTURES_UNPUBLISHED:
          action = api.admin.adventures.loadUnpublished;
          break;
        case ADVENTURES_REJECTED:
          action = api.admin.adventures.loadRejected;
          break;
        case ADVENTURES_CANCELLED:
          action = api.admin.adventures.loadCancelled;
          break;
        case ADVENTURES_PENDING:
          action = api.admin.adventures.loadPending;
          break;
      }

      return action(page, query, sort)
        .then( response => {
          commit(SET_ADVENTURES, response.data.adventures);
          commit(SET_TOTAL_PAGES, response.data.total_pages);

          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, error);
        });
    }
  }
}
