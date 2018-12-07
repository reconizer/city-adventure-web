import axios from 'axios';

import { LOGIN_ERROR, STORE_USER, REMOVE_USER } from '@/store/mutation-types';
import { LOGIN, LOGOUT } from '@/store/action-types';

import { authHeader } from '@/utils';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true, error: null }, user }
  : { status: { loggedIn: false, error: null }, user: null };

if(user && user.token) {
  axios.defaults.headers.common['Authorization'] = authHeader();
}

export default (api) => {
  return {
    namespaced: true,
    state: initialState,
    mutations: {
      [STORE_USER] (state, user) {
        state.status = { loggedIn: true };
        state.status.error = null;
        state.user = user;
      },

      [REMOVE_USER] (state) {
        state.status.loggedIn = false;
        state.status.error = null;
        state.user = null;
      },

      [LOGIN_ERROR] (state, error) {
        state.status.error = error;
      }
    },
    actions: {
      [LOGIN] ({ commit }, { email, password }) {
        return api.authentication.login(email, password)
          .then( response => {
            commit(STORE_USER, response.data);

            localStorage.setItem('user', JSON.stringify(response.data));

            axios.defaults.headers.common['Authorization'] = authHeader();

            return response;
          })
          .catch( error => {
            commit(LOGIN_ERROR, error);
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
