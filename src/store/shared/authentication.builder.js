import axios from 'axios';

import { STORE_USER, REMOVE_USER, SET_ERROR, SET_LOADING } from '@/store/mutation-types';
import { LOGIN, LOGOUT } from '@/store/action-types';

import { authHeader } from '@/utils';

const user = JSON.parse(localStorage.getItem('user'));

if(user && user.token) {
  axios.defaults.headers.common['Authorization'] = authHeader();
}

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
        console.log(error);
        state.error = error;
      }
    },
    actions: {
      [LOGIN] ({ commit }, { email, password }) {
        commit(SET_LOADING, true);

        return api.authentication.login(email, password)
          .then( response => {
            commit(STORE_USER, response.data);

            localStorage.setItem('user', JSON.stringify(response.data));

            axios.defaults.headers.common['Authorization'] = authHeader();

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, error);
          });
      },

      [LOGOUT] ({ commit }) {
        commit(REMOVE_USER);

        localStorage.removeItem('user');

        delete axios.defaults.headers.common['Authorization'];
      }
    }
  }
}
