import api from '@/api';

import {
  SET_LOADING, SET_ERROR,

  SET_ACCOUNT
} from '@/store/mutation-types'

import {
  LOAD_ACCOUNT, UPDATE_ACCOUNT
} from '@/store/action-types'

export default {
  namespaced: true,
  state: {
    account: null,

    loading: false,

    errors: {
      [LOAD_ACCOUNT]: null, [UPDATE_ACCOUNT]: null
    }
  },
  mutations: {
    [SET_ACCOUNT] (state, account) {
      state.account = account;
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, { key, error }) {
      state.errors[key] = error;
    }
  },
  actions: {
    [LOAD_ACCOUNT] ({ commit }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: LOAD_ACCOUNT, error: null });

      return api.creator.account.load()
        .then( response => {
          commit(SET_ACCOUNT, response.data);
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: LOAD_ACCOUNT, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [UPDATE_ACCOUNT] ({ commit }, { payload }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: UPDATE_ACCOUNT, error: null });

      return api.creator.account.update(payload)
        .then( response => {
          return api.creator.account.load();
        }).then( response => {
          commit(SET_ACCOUNT, response.data);
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: UPDATE_ACCOUNT, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    }
  }
}
