import api from '@/api';

import { SET_ADVENTURES, SET_LOADING, SET_ERROR } from '@/store/mutation-types';
import { LOAD_ADVENTURES, CREATE_ADVENTURE } from '@/store/action-types';

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
      commit(SET_ERROR, null);

      return api.creator.adventures.loadAdventures(page)
        .then( response => {
          commit(SET_ADVENTURES, response.data);
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, error.response.data);
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [CREATE_ADVENTURE] ({ commit }, { params }) {
      commit(SET_LOADING, true);

      return api.creator.adventures.createAdventure(params)
        .then( response => {
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, error.response.data);
          commit(SET_LOADING, false);

          throw error;
        });
    }
  }
}
