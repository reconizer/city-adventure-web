import api from '@/api';

import {
  SET_ADVENTURES,
  SET_LOADING,
  SET_ERROR
} from '@/store/mutation-types';

import {
  LOAD_ADVENTURES,
  REMOVE_ADVENTURE
} from '@/store/action-types';

export default {
  namespaced: true,
  state: {
    list: [],

    loading: false,
    errors: {
      [LOAD_ADVENTURES]: null, [CREATE_ADVENTURE]: null
    }
  },
  mutations: {
    [SET_ADVENTURES] (state, adventures) {
      state.list = adventures;
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, { key, error }) {
      state.errors[key] = error;
    }
  },
  actions: {
    [LOAD_ADVENTURES] ({ commit }, { page }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: LOAD_ADVENTURES, error: null });

      return api.creator.adventures.loadAdventures(page)
        .then( response => {
          commit(SET_ADVENTURES, response.data);
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: LOAD_ADVENTURES, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [CREATE_ADVENTURE] ({ commit }, { params }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: CREATE_ADVENTURE, error: null });

      return api.creator.adventures.createAdventure(params)
        .then( response => {
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: CREATE_ADVENTURE, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [REMOVE_ADVENTURE] ({ commit }, { id }) {
      commit(SET_LOADING, true);

      return api.creator.adventures.destroyAdventure(id)
        .then( response => {
          return api.creator.adventures.loadAdventures(1)
        }).then( response => {
          commit(SET_ADVENTURES, response.data);
          commit(SET_LOADING, false);

          return response;
        }).catch( error => {
          commit(SET_ERROR, { key: REMOVE_ADVENTURE, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    }
  }
}
