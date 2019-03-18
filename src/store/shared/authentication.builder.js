import axios from 'axios';

import { STORE_USER, REMOVE_USER, SET_ERROR, SET_LOADING } from '@/store/mutation-types';
import { LOGIN, LOGOUT } from '@/store/action-types';

import { authHeader } from '@/utils';

const user = JSON.parse(localStorage.getItem('user'));

axios.interceptors.request.use( (config) => {
  const header = authHeader();

  if(header) {
    config.headers.common['Authorization'] = header;
  }

  return config;
});

export default (api) => {
  return {
    namespaced: true,
    state: {
      user: user || null,
      loggedIn: user ? true : false,

      loading: false,
      error: null
    },
    mutations: {
      [STORE_USER] (state, user) {
        state.loggedIn = true;

        state.user = user;
        state.error = null;
      },

      [REMOVE_USER] (state) {
        state.loggedIn = false;

        state.error = null;
        state.user = null;
      },

      /**
       * GENERAL
       */
      [SET_LOADING] (state, loading) {
        state.loading = loading;
      },

      [SET_ERROR] (state, error) {
        state.error = error;
      }
    },
    actions: {
      [LOGIN] ({ commit }, { email, password }) {
        commit(SET_LOADING, true);
        commit(SET_ERROR, null);

        return api.authentication.login(email, password)
          .then( response => {
            let user = {
              email: email,
              token: response.data.token
            }

            commit(STORE_USER, user);

            localStorage.setItem('user', JSON.stringify(user));

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, error.response.data);
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [LOGOUT] ({ commit }) {
        commit(SET_LOADING, true);

        return api.authentication.logout()
          .then( response => {
            commit(REMOVE_USER);

            localStorage.removeItem('user');

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, error);
            commit(SET_LOADING, false);

            throw error;
          });
      }
    }
  }
}
