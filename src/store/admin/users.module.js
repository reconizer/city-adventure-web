import api from '/@api';

import {
  LOAD_USER, LOAD_USERS,

  CREATE_USER, DESTROY_USER,
  UPDATE_USER
} from '@/store/action-types'

import {
  SET_USERS, SET_USER,
  SET_TOTAL_PAGES,

  SET_LOADING, SET_ERROR
} from '@/store/mutation-types'

export default {
  namespaced: true,
  state: {
    item: null,
    list: [],
    totalPages: 1,

    loading: false,
    errors: {
      [LOAD_USER]: null, [LOAD_USERS]: null,
      [CREATE_USER]: null, [DESTROY_USER]: null,
      [UPDATE_USER]: null
    }
  },
  mutations: {
    [SET_USERS] (state, users) {
      state.list = users;
    },

    [SET_TOTAL_PAGES] (state, totalPages) {
      state.totalPages = totalPages;
    },

    [SET_USER] (state, user) {
      state.item = user;
    },

    /**
     * GENERAL
     */
    [SET_LOADING] (state, loading) {
      this.loading = loading;
    },

    [SET_ERROR] (state, { key, error }) {
      state.errors[key] = error;
    }
  },
  actions: {
    [LOAD_USERS] ({ commit }, { page, query }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: LOAD_USERS, error: null });

      return api.admin.users.loadUsers(page, query)
        .then( response => {
          commit(SET_LOADING, false);
          commit(SET_USERS, response.data.users;

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: LOAD_USERS, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [LOAD_USER] ({ commit }, id) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: LOAD_USER, error :null });

      return api.admin.users.loadUser(id)
        .then( response => {
          commit(SET_LOADING, false);
          commit(SET_USER, response.data);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: LOAD_USER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [CREATE_USER] ({ commit }, { params }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: CREATE_USER, error: null });

      return api.admin.users.createUser(params)
        .then( response => {
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: CREATE_USER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [DESTROY_USER] ({ commit }, { id }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: DESTROY_USER, error: null });

      return api.admin.users.destroyUser(id)
        .then( response => {
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: DESTROY_USER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    },

    [UPDATE_USER] ({ commit, state }, { params }) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, { key: UPDATE_USER, error: null });

      return api.admin.users.updateUser(state.item.id, params)
        .then( response => {
          commit(SET_LOADING, false);

          return response;
        })
        .catch( error => {
          commit(SET_ERROR, { key: UPDATE_USER, error: error.response.data });
          commit(SET_LOADING, false);

          throw error;
        });
    }
  }
}
