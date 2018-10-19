import api from '@/api';

import { SET_ADVENTURES, CLEAR_NEW_ADVENTURE, SET_LOADING, SET_ERROR } from './mutation-types';
import { LOAD_ADVENTURES } from './action-types';

export default {
  namespaced: true,
  state: {
    list: [],
    newAdventure: { },
    loading: false,
    error: null
  },
  mutations: {
    [SET_ADVENTURES] (state, adventures) {
      state.list = adventures;
    },

    [CLEAR_NEW_ADVENTURE] (state) {
      state.newAdventure = { };
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
