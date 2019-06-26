import api from '@/api';

import {
  ADD_ADVENTURES, CLEAR_ADVENTURES,

  SET_LOADING, SET_ERROR
} from '@/store/mutation-types'

import {
  LOAD_ADVENTURES, CREATE_ADVENTURE
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

    counters: {
      [ADVENTURES_PUBLISHED]: null,
      [ADVENTURES_IN_REVIEW]: null,
      [ADVENTURES_UNPUBLISHED]: null,
      [ADVENTURES_REJECTED]: null,
      [ADVENTURES_CANCELLED]: null,
      [ADVENTURES_PENDING]: null
    },

    loading: false,
    error: null
  },
  mutations: {
    [ADD_ADVENTURES] (state, adventures) {
      state.list.push(...adventures);
    },

    [CLEAR_ADVENTURES] (state) {
      state.list = [];
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, error) {
      state.error = error;
    }
  },
  actions: {
    [LOAD_ADVENTURES] ({ commit, state }, { page, searchParams }) {
      commit(SET_LOADING, true);

      return api.admin.adventures.loadAdventures(searchParams)
        .then( response => {
          commit(ADD_ADVENTURES, response.data);

          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, error);
        });
    }
  }
}
