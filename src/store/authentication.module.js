import { LOGIN_ERROR, STORE_USER, REMOVE_USER } from './mutation-types';
import { LOGIN, LOGOUT } from './action-types';

import router from '@/router';

import api from '@/api';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true, error: null }, user }
  : { status: { loggedIn: false, error: null }, user: null };

export default {
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
      api.authentication.login(email, password)
        .then( response => {
          console.log(response);

          commit(STORE_USER, response.data);
          router.push('/');
        })
        .catch( error => {
          commit(LOGIN_ERROR, error);
        });
    },

    [LOGOUT] ({ commit }) {
      commit(REMOVE_USER);
    }
  }
}
