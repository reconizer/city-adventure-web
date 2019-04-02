import api from '@/api';

import {
  SET_LOADING, SET_ERROR,

  SET_PROFILE
} from '@/store/mutation-types'

import {
  LOAD_PROFILE, UPDATE_PROFILE
} from '@/store/action-types'

export default {
  namespaced: true,
  state: {
    profile: null,

    loading: false,

    errors: {
      [LOAD_PROFILE]: null, [UPDATE_PROFILE]: null
    }
  },
  mutations: {
    [SET_PROFILE] (state, profile) {
      state.profile = profile;
    },

    [SET_LOADING] (state, loading) {
      state.loading = loading;
    },

    [SET_ERROR] (state, { key, error }) {
      state.errors[key] = error;
    }
  },
  actions: {
    [LOAD_PROFILE] ({ commit }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: LOAD_PROFILE, error: null });

      return api.creator.profile.load()
        .then( response => {
          commit(SET_PROFILE, response.data);
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: LOAD_PROFILE, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [UPDATE_PROFILE] ({ commit }, { payload }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: UPDATE_PROFILE, error: null });

      return api.creator.profile.update(payload)
        .then( response => {
          return api.creator.profile.load();
        }).then( response => {
          commit(SET_PROFILE, response.data);
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: UPDATE_PROFILE, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    }
  }
}
