import api from '@/api';

import { SET_ADVENTURES, SET_LOADING, SET_ERROR } from './mutation-types';
import { LOAD_ADVENTURES } from './action-types';

export default {
  namespaced: true,
  state: {
    list: [],

    loading: false,
    error: null
  },
  mutations: {
    [SET_ADVENTURES] (state, adventures) {
      state.list = adventures;
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, error) {
      state.error = error;
    }
  },
  actions: {
    [LOAD_ADVENTURES] ({ commit }, { page }) {
      commit(SET_LOADING, true);

      api.adventures.loadAdventures(page)
        .then( response => {
          commit(SET_ADVENTURES, response.data);
          commit(SET_LOADING, false);
        })
        .catch( error => {
          commit(SET_ERROR, error);
        });
    }
  }
}
